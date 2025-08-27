// Helper function to record array states
function recordStep(array, steps) {
  steps.push([...array]);
}

/* ----------------- Bubble Sort ----------------- */
export function bubbleSort(arr) {
  let steps = [];
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        recordStep(arr, steps);
      }
    }
  }
  return steps;
}

/* ----------------- Insertion Sort ----------------- */
export function insertionSort(arr) {
  let steps = [];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      recordStep(arr, steps);
    }
    arr[j + 1] = key;
    recordStep(arr, steps);
  }
  return steps;
}

/* ----------------- Selection Sort ----------------- */
export function selectionSort(arr) {
  let steps = [];
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      recordStep(arr, steps);
    }
  }
  return steps;
}

/* ----------------- Merge Sort ----------------- */
export function mergeSort(arr) {
  let steps = [];

  function merge(left, right) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
  }

  function divide(array) {
    if (array.length <= 1) return array;
    let mid = Math.floor(array.length / 2);
    let left = divide(array.slice(0, mid));
    let right = divide(array.slice(mid));
    let merged = merge(left, right);
    recordStep(merged, steps);
    return merged;
  }

  divide(arr);
  return steps;
}

/* ----------------- Quick Sort ----------------- */
export function quickSort(arr) {
  let steps = [];

  function partition(low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        recordStep(arr, steps);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    recordStep(arr, steps);
    return i + 1;
  }

  function quick(low, high) {
    if (low < high) {
      let pi = partition(low, high);
      quick(low, pi - 1);
      quick(pi + 1, high);
    }
  }

  quick(0, arr.length - 1);
  return steps;
}

/* ----------------- Heap Sort ----------------- */
export function heapSort(arr) {
  let steps = [];

  function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      recordStep(arr, steps);
      heapify(n, largest);
    }
  }

  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    recordStep(arr, steps);
    heapify(i, 0);
  }

  return steps;
}

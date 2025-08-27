import React, { useState } from "react";

// ----------------- Sorting Steps Generators -----------------

function getBubbleSortSteps(arr) {
  let steps = [];
  let a = [...arr];
  steps.push([...a]);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push([...a.map((val, idx) => (idx === j || idx === j + 1 ? -val : val))]);
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push([...a]);
      }
    }
  }
  return steps;
}

function getSelectionSortSteps(arr) {
  let steps = [];
  let a = [...arr];
  steps.push([...a]);
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push([...a.map((val, idx) => (idx === j || idx === minIdx ? -val : val))]);
      if (a[j] < a[minIdx]) minIdx = j;
    }
    [a[i], a[minIdx]] = [a[minIdx], a[i]];
    steps.push([...a]);
  }
  return steps;
}

function getInsertionSortSteps(arr) {
  let steps = [];
  let a = [...arr];
  steps.push([...a]);
  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      steps.push([...a.map((val, idx) => (idx === j || idx === j + 1 ? -val : val))]);
      a[j + 1] = a[j];
      j--;
      steps.push([...a]);
    }
    a[j + 1] = key;
    steps.push([...a]);
  }
  return steps;
}

function getMergeSortSteps(arr) {
  let steps = [];
  let a = [...arr];
  steps.push([...a]);

  function mergeSort(l, r) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
  }

  function merge(l, m, r) {
    let left = a.slice(l, m + 1);
    let right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      steps.push([...a.map((val, idx) => (idx === k ? -val : val))]);
      if (left[i] <= right[j]) a[k++] = left[i++];
      else a[k++] = right[j++];
      steps.push([...a]);
    }
    while (i < left.length) a[k++] = left[i++];
    while (j < right.length) a[k++] = right[j++];
    steps.push([...a]);
  }

  mergeSort(0, a.length - 1);
  return steps;
}

function getQuickSortSteps(arr) {
  let steps = [];
  let a = [...arr];
  steps.push([...a]);

  function quickSort(l, r) {
    if (l >= r) return;
    let p = partition(l, r);
    quickSort(l, p - 1);
    quickSort(p + 1, r);
  }

  function partition(l, r) {
    let pivot = a[r];
    let i = l - 1;
    for (let j = l; j < r; j++) {
      steps.push([...a.map((val, idx) => (idx === j || idx === r ? -val : val))]);
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push([...a]);
      }
    }
    [a[i + 1], a[r]] = [a[r], a[i + 1]];
    steps.push([...a]);
    return i + 1;
  }

  quickSort(0, a.length - 1);
  return steps;
}

// ----------------- SortingVisualizer Component -----------------

export default function SortingVisualizer() {
  const [array, setArray] = useState([8, 3, 5, 2, 9, 1, 6]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  const startSort = (algo) => {
    let s = [];
    if (algo === "bubble") s = getBubbleSortSteps(array);
    if (algo === "selection") s = getSelectionSortSteps(array);
    if (algo === "insertion") s = getInsertionSortSteps(array);
    if (algo === "merge") s = getMergeSortSteps(array);
    if (algo === "quick") s = getQuickSortSteps(array);
    setSteps(s);
    setStepIndex(0);
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
  };

  const prevStep = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const generateArray = () => {
    const arr = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 20) + 1
    );
    setArray(arr);
    setSteps([]);
    setStepIndex(0);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-5">
      {/* Bar Graph */}
      <div className="flex items-end gap-2 h-64">
        {(steps.length > 0 ? steps[stepIndex] : array).map((num, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-end rounded-t ${
              num < 0
                ? "bg-red-500"
                : stepIndex === steps.length - 1
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
            style={{ height: `${Math.abs(num) * 15}px`, width: "25px" }}
          >
            <span className="text-white text-xs">{Math.abs(num)}</span>
          </div>
        ))}
      </div>

      {/* Sorting Buttons */}
      <div className="flex gap-2 flex-wrap justify-center mt-4">
        <button
          onClick={generateArray}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Generate Array
        </button>
        <button
          onClick={() => startSort("bubble")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Bubble Sort
        </button>
        <button
          onClick={() => startSort("selection")}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Selection Sort
        </button>
        <button
          onClick={() => startSort("insertion")}
          className="px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-700"
        >
          Insertion Sort
        </button>
        <button
          onClick={() => startSort("merge")}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Merge Sort
        </button>
        <button
          onClick={() => startSort("quick")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Quick Sort
        </button>
      </div>

      {/* Step Controls */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={prevStep}
          disabled={stepIndex === 0}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={stepIndex === steps.length - 1 || steps.length === 0}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

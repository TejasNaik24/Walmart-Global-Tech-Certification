// this is a js file, but it is written in javascript as the task wants a js file

public class PowerOfTwoMaxHeap {
    private int[] heap;
    private int size;
    private int childrenPerNode;

    public PowerOfTwoMaxHeap(int power) {
        this.childrenPerNode = (int) Math.pow(2, power);
        this.heap = new int[16];
        this.size = 0;
    }

    private void ensureCapacity() {
        if (size >= heap.length) {
            int[] newHeap = new int[heap.length * 2];
            System.arraycopy(heap, 0, newHeap, 0, heap.length);
            heap = newHeap;
        }
    }

    public void insert(int value) {
        ensureCapacity();
        heap[size] = value;
        heapifyUp(size);
        size++;
    }

    public int popMax() {
        if (size == 0) throw new IllegalStateException("Heap is empty");
        int max = heap[0];
        heap[0] = heap[size - 1];
        size--;
        heapifyDown(0);
        return max;
    }

    private void heapifyUp(int index) {
        int current = index;
        while (current > 0) {
            int parent = (current - 1) / childrenPerNode;
            if (heap[current] > heap[parent]) {
                swap(current, parent);
                current = parent;
            } else {
                break;
            }
        }
    }

    private void heapifyDown(int index) {
        int current = index;
        while (true) {
            int largest = current;
            for (int i = 1; i <= childrenPerNode; i++) {
                int childIndex = childrenPerNode * current + i;
                if (childIndex < size && heap[childIndex] > heap[largest]) {
                    largest = childIndex;
                }
            }
            if (largest == current) break;
            swap(current, largest);
            current = largest;
        }
    }

    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }

    public void printHeap() {
        for (int i = 0; i < size; i++) {
            System.out.print(heap[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        PowerOfTwoMaxHeap heap = new PowerOfTwoMaxHeap(1); // 2 children per node
        heap.insert(10);
        heap.insert(20);
        heap.insert(5);
        heap.insert(40);
        heap.insert(30);
        heap.printHeap();

        System.out.println("Max: " + heap.popMax());
        heap.printHeap();
    }
}

# Walmart-Global-Tech-Certificaiton

This is my answers repository for selected tasks from the Walmart Forage Virtual Experience. It includes:

- A **Java implementation** (in `.js` format as required) of a custom heap structure.
- A **Python script** that reads from multiple spreadsheets and populates a SQLite database with cleaned and structured data.

## Check out my certification [here](https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_mGKMFkWbvxWi5DcWt_1752385546851_completion_certificate.pdf)!

## 📦 Task 1: Power-of-Two Max Heap (Java)

### 🔧 Description
The Power-of-Two Max Heap is a generalization of a traditional binary max heap. Instead of each node having exactly 2 children, it has `2^k` children, where `k` is a parameter provided at heap construction.

### 💡 Features
- **Heap Property**: Ensures that every parent node has a value greater than or equal to its children.
- **Configurable Arity**: Number of children per node is `2^arityExponent`.
- **Insert**: Adds an element and re-heapifies.
- **Pop Max**: Removes and returns the maximum element.

### 🛠️ Key Methods
- `insert(int value)`: Adds a new value to the heap.
- `popMax()`: Removes and returns the largest value.
- Uses an array-backed representation for performance.

---

## 🧮 Task 4: Data Munging and Database Population (Python)

### 🔧 Description
This Python script reads multiple CSV spreadsheets and populates a normalized SQLite database with shipment and product data. It handles disparate formats and combines information from different files into the correct relational structure.

### 📂 Files Used
- `spreadsheet0.csv`: Can be directly inserted into the database.
- `spreadsheet1.csv`: Contains shipment-product mapping.
- `spreadsheet2.csv`: Contains origin and destination info for shipments.

### 📋 Functionality
- Reads data from CSV files.
- Aggregates and transforms it into structured format.
- Populates two SQLite tables:
  - `shipment`: Contains shipment ID, origin, destination.
  - `shipment_product`: Contains shipment ID, product name, and quantity.

### 🛠️ Key Steps
1. Reads and inserts `spreadsheet0` directly.
2. Maps `shipment_id` to origin and destination using `spreadsheet2`.
3. Aggregates product quantities per shipment from `spreadsheet1`.
4. Inserts cleaned data into the database.

### ✅ Output
A fully populated SQLite database (`shipment.db`) containing normalized, consistent data ready for querying.

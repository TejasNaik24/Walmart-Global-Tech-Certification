import csv
import sqlite3
from collections import defaultdict

def connect_db(path="shipment.db"):
    return sqlite3.connect(path)

def insert_shipment_data(cursor, shipment_id, origin, destination):
    cursor.execute(
        "INSERT INTO shipment (id, origin, destination) VALUES (?, ?, ?)",
        (shipment_id, origin, destination)
    )

def insert_product_data(cursor, shipment_id, product_name, quantity):
    cursor.execute(
        "INSERT INTO shipment_product (shipment_id, product_name, quantity) VALUES (?, ?, ?)",
        (shipment_id, product_name, quantity)
    )

def handle_spreadsheet0(cursor, filepath="spreadsheet0.csv"):
    with open(filepath, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            insert_product_data(cursor, row["shipment_id"], row["product_name"], row["quantity"])

def build_location_map(filepath="spreadsheet2.csv"):
    shipment_locations = {}
    with open(filepath, newline='') as f:
        for row in csv.DictReader(f):
            shipment_locations[row["shipment_id"]] = (row["origin"], row["destination"])
    return shipment_locations

def aggregate_shipments(filepath="spreadsheet1.csv"):
    aggregated_data = defaultdict(lambda: defaultdict(int))
    with open(filepath, newline='') as f:
        for row in csv.DictReader(f):
            shipment_id = row["shipment_id"]
            product = row["product_name"]
            aggregated_data[shipment_id][product] += 1
    return aggregated_data

def populate_database():
    conn = connect_db()
    cur = conn.cursor()

    # Insert directly from spreadsheet0
    handle_spreadsheet0(cur)

    # Prepare shipment and product mappings from spreadsheets 1 & 2
    location_map = build_location_map()
    product_counts = aggregate_shipments()

    for shipment_id, products in product_counts.items():
        if shipment_id not in location_map:
            continue  # Skip invalid shipment IDs
        
        origin, destination = location_map[shipment_id]
        insert_shipment_data(cur, shipment_id, origin, destination)

        for product, qty in products.items():
            insert_product_data(cur, shipment_id, product, qty)

    conn.commit()
    conn.close()
    print("🎉 All data successfully imported.")

if __name__ == "__main__":
    populate_database()

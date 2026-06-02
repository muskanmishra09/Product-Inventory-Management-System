from psycopg2.extras import RealDictCursor
from database.decorators import query_function

from models.orders import Order
from data_access.utils.update_check import was_id_updated


@query_function
def get_all_orders(conn):

    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        "SELECT * FROM orders"
    )

    return cursor.fetchall()


@query_function
def get_order_by_id(conn, id: int):

    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        "SELECT * FROM orders WHERE id=(%s)",
        (id,)
    )

    return cursor.fetchone()


@query_function
def add_order(conn, order: Order):
    
    

    # Quantity Validation
    if order.quantity <= 0:
        raise Exception(
            "Quantity must be positive"
        )

    cursor = conn.cursor(
        cursor_factory=RealDictCursor
    )

    # Get Product Details
    cursor.execute(
        """
        SELECT
            price,
            stock
        FROM products
        WHERE id=(%s)
        """,
        (order.product_id,)
    )

    product = cursor.fetchone()

    # Product Validation
    if not product:
        raise Exception(
            "Product not found"
        )

    # Inventory Validation
    if product["stock"] < order.quantity:
        raise Exception(
            "Insufficient stock"
        )

    # Auto Calculate Total Amount
    total_amount = (
        product["price"]
        * order.quantity
    )

    # Create Order
    cursor.execute(
        """
        INSERT INTO orders
        (
            customer_id,
            product_id,
            quantity,
            total_amount
        )
        VALUES
        (
            %s,
            %s,
            %s,
            %s
        )
        """,
        (
            order.customer_id,
            order.product_id,
            order.quantity,
            total_amount
        )
    )

    # Auto Reduce Stock
    cursor.execute(
        """
        UPDATE products
        SET stock = stock - %s
        WHERE id = %s
        """,
        (
            order.quantity,
            order.product_id
        )
    )

    conn.commit()

@query_function
def delete_order(conn, id: int):

    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM orders
        WHERE id=(%s)
        RETURNING id
        """,
        (id,)
    )

    conn.commit()

    was_id_updated(cursor)
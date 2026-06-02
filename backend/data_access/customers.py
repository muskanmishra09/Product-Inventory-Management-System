from psycopg2.extras import RealDictCursor
from database.decorators import query_function
from backend.models.customers import Customer
from backend.data_access.utils.update_check import was_id_updated


@query_function
def get_all_customers(conn):
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        "SELECT * FROM customers"
    )

    return cursor.fetchall()


@query_function
def get_customer_by_id(conn, id: int):
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        "SELECT * FROM customers WHERE id=(%s)",
        (id,)
    )

    return cursor.fetchone()


@query_function
def add_customer(conn, customer: Customer):
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO customers(full_name,email,phone)
        VALUES(%s,%s,%s)
        """,
        (
            customer.full_name,
            customer.email,
            customer.phone
        )
    )

    conn.commit()


@query_function
def delete_customer(conn, id: int):
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM customers WHERE id=(%s) RETURNING id",
        (id,)
    )

    conn.commit()

    was_id_updated(cursor)


@query_function
def update_customer(conn, id: int, customer: Customer):
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE customers
        SET full_name=(%s),
            email=(%s),
            phone=(%s)
        WHERE id=(%s)
        RETURNING id
        """,
        (
            customer.full_name,
            customer.email,
            customer.phone,
            id
        )
    )

    conn.commit()

    was_id_updated(cursor)
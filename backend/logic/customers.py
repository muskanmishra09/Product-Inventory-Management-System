from backend.data_access.customers import (
    get_all_customers,
    get_customer_by_id,
    add_customer,
    delete_customer,
    update_customer
)


def get_all_customers_data():
    return get_all_customers()


def get_customer_data_by_id(id: int):
    return get_customer_by_id(id)


def create_new_customer(customer):
    add_customer(customer)


def delete_customer_data(id: int):
    delete_customer(id)


def update_customer_data(id: int, customer):
    update_customer(id, customer)
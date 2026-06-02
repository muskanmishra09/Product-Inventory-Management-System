from backend.data_access.orders import (
    get_all_orders,
    get_order_by_id,
    add_order,
    delete_order
)


def get_all_orders_data():
    return get_all_orders()


def get_order_data_by_id(id: int):
    return get_order_by_id(id)


def create_new_order(order):
    add_order(order)


def delete_order_data(id: int):
    delete_order(id)
// OrderField.jsx
import React from 'react';

const OrderField = ({ order }) => (
  <div className="mb-4">
    <a className="border border-gray-300 block rounded-md hover:bg-gray-50 transition duration-150 ease-in-out">
      <article className="p-4 flex space-x-4 items-center">
        <section className="flex-1">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Commande #{order.id}</h3>
            <p className="text-gray-500">Passée le {order.date}</p>
          </div>
          <div className="mt-2">
            <p className="text-green-500 font-semibold">{order.status}</p>
            <p className="text-gray-500">{order.type}</p>
          </div>
          <span className="text-xl font-semibold text-blue-600">{order.total} €</span>
        </section>
		<ul className="flex space-x-2">
			{order.productOrders.length <= 3 ? (
				order.productOrders.map((productOrder, index) => (
				<li key={index}>
					<img
					src={productOrder.product.images[0].url}
					className="w-12 h-full object-cover rounded"
					alt={`Product ${index + 1}`}
					/>
				</li>
				))
			) : (
				order.productOrders.slice(0, 3).map((productOrder, index) => (
				<li key={index}>
					<img
					src={productOrder.product.images[0].url}
					className="w-12 h-full object-cover rounded"
					alt={`Product ${index + 1}`}
					/>
				</li>
				))
			)}
			</ul>
      </article>
    </a>
  </div>
);

export default OrderField;

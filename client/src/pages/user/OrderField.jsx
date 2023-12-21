// OrderField.jsx
import React from "react";

const status = {
  0: "En attente",
  1: "Attente de paiement",
  2: "En préparation",
  3: "Prêt",
  4: "Terminé",
  5: "Annulé"
};

const OrderField = ({ order }) => (
  <div className="mb-4">
      <label className="border border-gray-300 block rounded-md hover:bg-gray-50 transition duration-150 ease-in-out">
        <input
          type="checkbox"
          className="order_checkbox hidden"
        />
      <article className="p-4 flex flex-wrap md:flex-nowrap md:space-x-4">
        <section className="flex-1 mb-5 md:mb-0">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Commande #{order.id}
            </h3>
            <p className="text-gray-500 whitespace-nowrap">Passée le {order.date}</p>
          </div>
          <div className="mt-2">
            <div className="flex">
              <p className="text-gray-500">Statut :&nbsp;</p>
              {status[order.status]}
            </div>
            <p className="text-gray-500">
              Type : {order.type === 1 ? "Livraison" : "Click and Collect"}
            </p>
          </div>
          <span className="text-xl font-semibold text-blue-600">
            {order.total} €
          </span>
        </section>
        <ul className="order_preview flex gap-2">
          {order.productOrders.slice(0, 3).map((productOrder, index) => (
            <li key={index}>
              <img
                src={productOrder.product.images[0].url}
                className="w-32 h-full object-cover rounded"
                alt={`Product ${index + 1}`}
              />
            </li>
          ))}
          {order.productOrders.length > 3 && (
            <li className="flex items-center justify-center p-1 h-full rounded">
              +{order.productOrders.length - 3}
            </li>
          )}
          {order.productOrders.length <= 3 && (
            <li className="flex items-center justify-center ml-6 h-full rounded">
              &nbsp;
            </li>
          )}
        </ul>
        <ul className="order_detail gap-6 flex flex-wrap justify-normal md:justify-end">
        {order.productOrders.map((productOrder, index) => (
          <li key={index} className="flex items-center space-x-2">
            <img
              src={productOrder.product.images[0].url}
              className="w-32 h-full object-cover rounded"
              alt={`Product ${index + 1}`}
            />
            <div>
              <p className="text-gray-800">{productOrder.product.name}</p>
              <p className="text-gray-500">{productOrder.product.price} €</p>
              <p className="text-gray-500">
                Quantité : {productOrder.quantity}
              </p>
              <p className="text-xl font-semibold text-blue-600">{productOrder.total} €</p> 
            </div>
          </li>
        ))}
      </ul>
      </article>
    </label>
  </div>
);

export default OrderField;

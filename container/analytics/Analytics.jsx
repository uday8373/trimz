import Image from "next/image";
import React, {useState} from "react";
import QRImage from "../../public/qrcode.png";
export default function Analytics() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      ShortLink: "http://localhost:3000/tiyG",
      OriginalLink: "https://github.com/Project-Erex/food_comet_backend/tree/master",
      date: "Jan 6, 2022",
      QrCode: QRImage,
      Clicks: 150,
    },
  ]);

  return (
    <section className="container px-4 mx-auto">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-3">
                        <button className="flex items-center gap-x-2">
                          <span>Short Link</span>
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Original Link
                    </th>

                    <th
                      scope="col"
                      className="w-40 text-sm font-normal text-left text-gray-500 rtl:text-right dark:text-gray-400">
                      QR Code
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-sm font-normal text-left text-gray-500 rtl:text-right dark:text-gray-400">
                      Clicks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-sm font-normal text-left text-gray-500 rtl:text-right dark:text-gray-400">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <span>{invoice.ShortLink}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <span>{invoice.OriginalLink}</span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <Image
                            src={invoice.QrCode}
                            width={0}
                            height={0}
                            className="w-20 h-full lg:w-16 lg:h-16"
                            alt="image"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {invoice.Clicks}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {invoice.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";

export default function Categories() {
  function getCategories() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  const { data, isLoading } = useQuery("getCategories", getCategories);

  return (
    <>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <>
          <Helmet>
            <title>Categories</title>
            <meta name="description" content="Categories Page" />
          </Helmet>
          <h1 className="fw-bolder mt-5 h4">Our Categories</h1>
          <div className="row my-3 g-4">
            {data?.data.data.map((catg) => {
              return (
                <div className="col-md-3" key={catg._id}>
                  <div className="shadow cursor-pointer catgCard overflow-hidden rounded-2">
                    <img
                      src={catg.image}
                      alt={catg.name}
                      className="w-100 mb-2"
                      height={300}
                    />
                    <h2 className="h5 fw-bold text-center p-3">{catg.name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

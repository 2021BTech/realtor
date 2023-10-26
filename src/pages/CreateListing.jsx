import React, { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathroom: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;
  function onChange() {}
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold"> Create a Listing</h1>
      {/* form for listing */}
      <form>
        {/* button input */}
        <p className="text-lg mt-6 font-semibold "> Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent" ? "bg-white text-black" : "bg-slate text-white"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale" ? "bg-white text-black" : "bg-slate text-white"
            }`}
          >
            Rent
          </button>
        </div>
        {/*  Text input*/}
        <p className="text-lg mt-6 font-semibold "> Name </p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Property name"
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-xl text-grey bg-white border border-grey rounded transition duration-150 ease-in-out focus:text-grey-700 focus:bg-white focus:border-slate mb-6"
        />
        {/* Property listing offer */}
        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-center text-black bg-white border border-grey rounded transition duration-150 ease-in-out focus:text-grey focus:bg-white focus:border-slate"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-center text-black bg-white border border-grey rounded transition duration-150 ease-in-out focus:text-grey focus:bg-white focus:border-slate"
            />
          </div>
        </div>
        {/* Parking Spot button input */}
        <p className="text-lg mt-6 font-semibold "> Parking Spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate text-white"
            }`}
          >
            No
          </button>
        </div>
        {/*Furnished  button input */}
        <p className="text-lg mt-6 font-semibold "> Furnished </p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-slate text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-slate text-white"
            }`}
          >
            No
          </button>
        </div>
        {/*  Text input*/}
        <p className="text-lg mt-6 font-semibold "> Address </p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Address"
          required
          className="w-full px-4 py-2 text-xl text-grey bg-white border border-grey rounded transition duration-150 ease-in-out focus:text-grey-700 focus:bg-white focus:border-slate mb-6"
        />
        <p className="text-lg font-semibold "> Description </p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-grey bg-white border border-grey rounded transition duration-150 ease-in-out focus:text-grey-700 focus:bg-white focus:border-slate mb-6"
        />
        {/* Offer button input */}
        <p className="text-lg font-semibold "> Offer</p>
        <div className="flex mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-slate text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-slate text-white"
            }`}
          >
            No
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold"> Regular Price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onCanPlay={onChange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-black bg-white border border-grey rounded transition duration-150 ease-in-out focus:text-grey focus:bg-white focus:border-slate text-center"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap"> $ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold"> Discounted Price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onCanPlay={onChange}
                  min="50"
                  max="400000000"
                  required={offer}
                  className="w-full px-4 py-2 text-xl text-black bg-white border border-grey rounded transition duration-150 ease-in-out focus:text-grey focus:bg-white focus:border-slate text-center"
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* image button */}
        <div className="mb-6 ">
          <p className="text-lg font-semibold"> Images</p>
          <p className="text-slate">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="ww-full px-3 py-1.5 text-slate bg-white border border-grey rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate focus:text-black text-center"
          />
        </div>
        <button
          type="button"
          className="mb-6 w-full px-7 py-3 bg-blue text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;

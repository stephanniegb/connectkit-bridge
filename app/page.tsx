"use client";
import { useState } from "react";

interface TokenboundOptions {
  address: string;
  parentWallet: string;
}

interface WalletIds {
  id: string;
  label: string;
}

export default function Home() {
  const [options, setOptions] = useState<TokenboundOptions>({
    address: "",
    parentWallet: "",
  });

  const [errors, setErrors] = useState({
    address: "",
    parentWallet: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const newErrors = {
      address:
        options.address.length === 0
          ? "Please enter a valid tokenbound account address"
          : "",
      parentWallet:
        options.parentWallet.length === 0 ? "Please select parent wallet" : "",
    };

    setErrors(newErrors);
    if (newErrors.address || newErrors.parentWallet) {
      return;
    }

    window.parent.postMessage(options, "*");
  };

  const wallets: WalletIds[] = [
    {
      id: "braavos",
      label: "Braavos",
    },
    {
      id: "argentX",
      label: "ArgentX",
    },
    {
      id: "ArgentWebWallet",
      label: "Argent Web Wallet",
    },
    {
      id: "controller",
      label: "Cartridge Controller",
    },
  ];

  return (
    <main className="flex items-center h-auto overflow-y-hidden">
      <div className="w-full bg-overlay h-full rounded-[24px] bg-cover bg-no-repeat">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-full">
          <div className="hidden md:flex flex-col items-center md:py-[250px] h-full">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-5 h-5">
                <img
                  className="object-cover w-full h-full"
                  src="/logo.png"
                  alt="logo"
                />
              </div>
              <h1 className="text-[16px] font-poppins font-medium text-[#F0F0F0]">
                Connect Account
              </h1>
            </div>
            <p className="text-[27px] font-poppins font-bold leading-[40px] text-[#F0F0F0]">
              Tokenbound Account
            </p>
          </div>

          <div className="flex flex-col py-40 md:py-[100px] bg-white rounded-[24px] h-full px-5">
            <div className="space-y-1">
              <p className="text-[#1E1E1E] font-poppins text-[18px] font-semibold leading-[30px]">
                Connect Your Tokenbound Account
              </p>
              <p className="text-[#7E7E7E] font-poppins text-[14px] font-normal leading-[21px]">
                Provide your Tokenbound account address and select its parent
                wallet.
              </p>
            </div>
            <div className="pt-[40px] space-y-3">
              <input
                type="text"
                placeholder="Account address"
                id="tba-address"
                name="address"
                value={options.address}
                onChange={handleChange}
                className={`w-full border font-poppins text-sm bg-white text-black h-[50px] font-normal rounded-[4px] px-3 py-2 mb-1 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 ${
                  errors.address ? "border-red-500" : "border-[#C7C7C7]"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}

              <div
                className={`w-full border text-sm bg-white text-black h-[50px] font-normal rounded-[4px] px-3 py-2 mb-1 placeholder:text-gray-500 focus:outline-none ${
                  errors.parentWallet ? "border-red-500" : "border-[#C7C7C7]"
                }`}
              >
                <select
                  id="options"
                  name="parentWallet"
                  value={options.parentWallet}
                  onChange={handleSelectChange}
                  className="w-full h-full focus:outline-none font-poppins "
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {wallets.map(({ id, label }) => (
                    <option key={id} value={id} className="capitalize">
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.parentWallet && (
                <p className="text-red-500 text-sm">{errors.parentWallet}</p>
              )}

              <div className="py-5 pt-8 w-full">
                <button
                  onClick={handleSubmit}
                  className="w-full text-[#F9F9F9] font-poppins bg-[#272727] rounded-lg text-base h-[46px] border-[#272727] outline-none p-2"
                >
                  Connect account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

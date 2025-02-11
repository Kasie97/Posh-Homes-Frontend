import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../axios";

export interface IUnit {
  id: string;
  name: string;
  number: string;
  status: "available" | "occupied";
  numberOfBedrooms: string;
  price: string;
  pictures: string[];
  type: string;
  userId: string;
  location: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductContextProps {
  units: IUnit[];
  allUnits: IUnit[];
  price: number;
  filter: IUnit[];
  search: IUnit[];
  setPrice: (price: number) => void;
  fetchAllUnits: () => void;
  fetchFilter: () => void;
  loading: boolean;
  loadUnits: boolean;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [allUnits, setAllUnits] = useState<IUnit[]>([]);
  const [search, setSearch] = useState<IUnit[]>([]);
  const [filter, setFilter] = useState<IUnit[]>([]);
  const [loadUnits, setLoadUnits] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllUnits = async () => {
    setLoadUnits(true);
    try {
      const response = await axios.get("/api/my-units");
      const data = await response.data.data;
      console.log("all the units", data);
      setAllUnits(data);
      setLoadUnits(false);
    } catch (error) {
      console.error("Error fetching artworks by artist:", error);
      setLoadUnits(false);
    }
  };

  useEffect(() => {
    const fetchFilter = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/filter-units");
        const data = await response.data.data;
        console.log("Filter", data);

        setFilter(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    const fetchSearch = async () => {
      try {
        const response = await axios.get("/api//search-units");
        const data = await response.data.data;
        console.log("Search", data);

        setSearch(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSearch();
    fetchFilter();
    fetchAllUnits();
  });
  [];
  return (
    <ProductContext.Provider
      value={{
        units: [],
        allUnits,
        price: 0,
        filter,
        search,
        setPrice: () => {},
        fetchAllUnits,
        fetchFilter: () => {},
        loading,
        loadUnits,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

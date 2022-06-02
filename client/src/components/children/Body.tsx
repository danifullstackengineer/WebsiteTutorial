import { useLazyQuery } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../../styles/children/Body.module.css";
import { useLocation, useParams } from "react-router-dom";
import {
  getInitialProducts,
  getProductBasedOnType,
} from "../../api/Queries/Products";
import IProduct, { SwordType } from "../../types/Product";
import ProductMultiple from "./subchildren/ProductMultiple";
import { cloneDeep } from "@apollo/client/utilities";

const Body = () => {
  // static data
  const limit = 5;

  // dynamic data
  const { type } = useParams();
  const [offset, setOffset] = useState<number>(0);
  const [sword_type, set_sword_type] = useState<string>(
    SwordType[SwordType["BROADSWORD"]]
  );
  const [products, setProducts] = useState<IProduct[]>([]);
  const lastProductRef = useRef<HTMLDivElement>(null);
  const [loadMoreInitial, setLoadMoreInitial] = useState<boolean>(false);
  const [loadMoreSecondary, setLoadMoreSecondary] = useState<boolean>(false);

  // Our Jsx element array containg the products
  const [renderedProducts, setRenderedProducts] = useState<JSX.Element[]>([]);

  // Queries
  // Query 1. Getting main page data
  const [
    getInitialProductsQuery,
    {
      loading: loadingInitial,
      error: errorInitial,
      data: dataInitial,
      fetchMore: fetchMoreInitial,
    },
  ] = useLazyQuery<
    { getAllProducts: IProduct[] },
    { offset: number; limit: number }
  >(getInitialProducts, {
    variables: {
      offset,
      limit,
    },
  });
  // Query 2. Getting secondary pages data
  const [
    getSecondaryProductsQuery,
    {
      loading: loadingSecondary,
      error: errorSecondary,
      data: dataSecondary,
      fetchMore: fetchMoreSecondary,
    },
  ] = useLazyQuery<{ getProductsBasedOnType: IProduct[] }, { type: string }>(
    getProductBasedOnType,
    {
      variables: {
        type: sword_type,
      },
    }
  );

  // Use the lazy queries depending on the type. If type is undefined then we are on the main page.
  useEffect(() => {
    setProducts([]);
    if (type === undefined) {
      getInitialProductsQuery();
    } else {
      getSecondaryProductsQuery();
    }
  }, [getInitialProductsQuery, getSecondaryProductsQuery, type]);

  // Handle what happens when data for main products change
  useEffect(() => {
    // If dataInitial is empty then we don't want to do any extra work
    if (dataInitial) {
      setProducts([...products, ...dataInitial.getAllProducts]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInitial]);

  // Handle what happens when data for secondary products change
  useEffect(() => {
    // If dataSecondary is empty then we don't want to do any extra work
    if (dataSecondary) {
      setProducts([...products, ...dataSecondary.getProductsBasedOnType]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSecondary]);


  // helper function to render the products
  const render_my_prods = useCallback((): JSX.Element[] => {
    setRenderedProducts(
      products.map((product, i) => {
        return (
          <ProductMultiple
            key={i}
            product={product}
            is_loaded_lazy={i >= 5 + offset}
            refMultiple={i === products.length - 1 ? lastProductRef : undefined}
          />
        );
      })
    );
    return [<></>];
  }, [offset, products]);

  // Call the function everytime the offset and the products change.
  useEffect(() => {
    render_my_prods();
  }, [render_my_prods]);

  // Changes the sword_type
  useEffect(() => {
    switch (type) {
      case "broadsword":
        return set_sword_type(SwordType[SwordType.BROADSWORD]);
      case "cutlass":
        return set_sword_type(SwordType[SwordType.CUTLASS]);
      case "katana":
        return set_sword_type(SwordType[SwordType.KATANA]);
      case "knife":
        return set_sword_type(SwordType[SwordType.KNIFE]);
      case "longsword":
        return set_sword_type(SwordType[SwordType.LONGSWORD]);
      case "rapier":
        return set_sword_type(SwordType[SwordType.RAPIER]);
      case "wakizashi":
        return set_sword_type(SwordType[SwordType.WAKIZASHI]);
      default:
        return;
    }
  }, [type]);

  //   Handle reaching the bottom of the page
  // detect scroll
  useEffect(() => {
    const handleScrolling = () => {
      if (lastProductRef.current) {
        const top = lastProductRef.current.offsetTop;
        const height = lastProductRef.current.offsetHeight;
        const y = window.scrollY;
        if (height + y >= top && !loadingInitial && !loadingSecondary) {
          setLoadMoreInitial(true);
        }
      }
    };

    window.addEventListener("scroll", handleScrolling);
    return () => window.removeEventListener("scroll", handleScrolling);
  }, [loadingInitial, loadingSecondary]);

  useEffect(() => {
    if (loadMoreInitial || loadMoreSecondary) {
      setLoadMoreInitial(false);
      setLoadMoreSecondary(false);
      //   if (!type) {
      //     fetchMoreInitial({
      //       // Fetch more uses original variables, so we can just pass the updated offset.
      //       variables: {
      //         offset: offset + limit,
      //       },
      //     });
      //   } else {
      //     fetchMoreSecondary({
      //       variables: {
      //         offset: offset + limit,
      //       },
      //     });
      //   }
      if (!type) {
        fetchMoreInitial({
          variables: {
            offset: offset + limit,
          },
        });
      } else {
        fetchMoreSecondary({
          variables: {
            offset: offset + limit,
          },
        });
      }
      setOffset(offset + limit);
    }
  }, [
    fetchMoreInitial,
    fetchMoreSecondary,
    loadMoreInitial,
    loadMoreSecondary,
    offset,
    type,
  ]);

  const handleDownwardsClick = () => {};
  const handleUpwardsClick = () => {};

  return (
    <div className={styles.body}>
      <>
        {/* {productsOne ? renderProducts() : ""} */}
        {renderedProducts}
        <button
          className={`${styles.body__btn} ${styles.body__btn__first}`}
          type="button"
          onClick={handleUpwardsClick}
        ></button>
        <button
          className={`${styles.body__btn} ${styles.body__btn__second}`}
          type="button"
          onClick={handleDownwardsClick}
        ></button>
      </>
    </div>
  );
};

export default Body;

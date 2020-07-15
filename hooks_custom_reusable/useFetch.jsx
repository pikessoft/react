import { useEffect, useState } from "react";
import _axios from "axios";
import filterData from "../utils/filter";
import { throwServerError } from "../utils/throwServerError";

const setDefaultData = (option) => {
  let defaultData = [];
  if (option === false) {
    defaultData = [];
  } else if (option) {
    defaultData = option;
  }
  return defaultData;
};

const useFetch = (api, options = {}) => {
  const {
    defaultData: defaultDataOption,
    callBack,
    callBefore,
    config,
    sorter,
    deps,
    searchQuery,
    baseURL,
    onError,
    shouldFetch,
  } = options;

  const defaultData = setDefaultData(defaultDataOption);
  const [state, setState] = useState({
    data: defaultData,
    loading: true,
    filteredData: [],
  });

  useEffect(() => {
    (async function () {
      try {
        if (shouldFetch !== false) {
          setState(({ data, filteredData }) => ({
            data,
            loading: true,
            filteredData,
          }));

          let axios = _axios;

          if (callBefore) {
            callBefore(data);
          }
          if (baseURL) {
            axios = axios.create({
              baseURL,
              headers: { token: localStorage.getItem("auth_token") },
            });
          }

          const { data } = await axios.get(api, config);

          if (callBack) {
            callBack(data);
          }

          if (sorter && data.sort) {
            data.sort((a, b) => sorter(a, b));
          }

          setState({ data, loading: false, filteredData: data });
        }
      } catch (e) {
        console.log("Catached!!!!");
        if (onError) {
          onError(e);
        }
        setState({
          error: e.message,
          loading: false,
          data: state.data || defaultData,
          filterData: state.filteredData || defaultData,
        });
        throwServerError(e);
      }
    })();
  }, deps || []);

  useEffect(() => {
    if (searchQuery !== null && state.data && state.data.filter) {
      setState({ ...state, filteredData: filterData(state.data, searchQuery) });
    }
  }, [searchQuery]);

  return state;
};

export default useFetch;

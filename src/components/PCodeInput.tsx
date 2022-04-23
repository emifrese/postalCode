import { useEffect, useState } from "react";
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import PostalCodeInfo from "./PostalCodeInfo";

const PCodeInput: React.FC = () => {
  const usStates: { name: string; id: string }[] = [
    { name: "Select State", id: "0" },
    { name: "Alabama", id: "AL" },
    { name: "Alaska", id: "AK" },
    { name: "Arizona", id: "AZ" },
    { name: "Arkansas", id: "AR" },
    { name: "California", id: "CA" },
    { name: "Colorado", id: "CO" },
    { name: "Connecticut", id: "CT" },
    { name: "Delaware", id: "DE" },
    { name: "Florida", id: "FL" },
    { name: "Georgia", id: "GA" },
    { name: "Hawaii", id: "HI" },
    { name: "Idaho", id: "ID" },
    { name: "Illinois", id: "IL" },
    { name: "Indiana", id: "IN" },
    { name: "Iowa", id: "IA" },
    { name: "Kansas", id: "KS" },
    { name: "Kentucky", id: "KY" },
    { name: "Louisiana", id: "LA" },
    { name: "Maine", id: "ME" },
    { name: "Maryland", id: "MD" },
    { name: "Massachusetts", id: "MA" },
    { name: "Michigan", id: "MI" },
    { name: "Minnesota", id: "MN" },
    { name: "Mississippi", id: "MS" },
    { name: "Missouri", id: "MO" },
    { name: "Montana", id: "MT" },
    { name: "Nebraska", id: "NE" },
    { name: "Nevada", id: "NV" },
    { name: "New Hampshire", id: "NH" },
    { name: "New Jersey", id: "NJ" },
    { name: "New Mexico", id: "NM" },
    { name: "New York", id: "NY" },
    { name: "North Carolina", id: "NC" },
    { name: "North Dakota", id: "ND" },
    { name: "Ohio", id: "OH" },
    { name: "Oklahoma", id: "OK" },
    { name: "Oregon", id: "OR" },
    { name: "Pennsylvania", id: "PA" },
    { name: "Rhode Island", id: "RI" },
    { name: "South Carolina", id: "SC" },
    { name: "South Dakota", id: "SD" },
    { name: "Tennessee", id: "TN" },
    { name: "Texas", id: "TX" },
    { name: "Utah", id: "UT" },
    { name: "Vermont", id: "VT" },
    { name: "Virginia", id: "VA" },
    { name: "Washington", id: "WA" },
    { name: "West Virginia", id: "WV" },
    { name: "Wisconsin", id: "WI" },
    { name: "Wyoming", id: "WY" },
  ];

  const usStateArray: string[] = [];
  usStates.forEach((state) => usStateArray.push(state.name));

  const defaultPCode: {city: string;
    city_en: string;
    country_code: string;
    latitude: string;
    longitude: string;
    postal_code: string;
    province: string;
    province_code: string;
    state: string;
    state_code: string;
    state_en: string} = {
    city: "",
    city_en: "",
    country_code: "",
    latitude: "",
    longitude: "",
    postal_code: "",
    province: "",
    province_code: "",
    state: "",
    state_code: "",
    state_en: "",
  }

  const [pCodeInput, setPCodeInput] = useState("00001");
  const [selectedState, setSelectedState] = useState("Select State");
  const [statePCodes, setStatePCodes] = useState([{}]);
  const [selectedPCode, setSelectedPCode] = useState(defaultPCode);
  const [alert, setAlert] = useState({ msg: "" });
  const [optionalMenu, setOptionalMenu] = useState(false);

  const handleOnSearch = (string: any, results: any) => {
  };

  const handleOnSelect = async (item: any) => {
   try {
     const { data } = await axios(
       `httpsapp.zipcodebase.com/api/v1/search?apikey=${
         import.meta.env.VITE_API_KEY
       }&codes=${item.name}&country=US`
     );
     setSelectedPCode(data.results[item.name][0]);
     console.log(data.results[item.name][0]);
   } catch (error) {
     console.log(error);
   }
  }; 

  const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          Postal Code: {item.name}
        </span>
      </>
    );
  };

 useEffect(() => {
   const getStatePCodes: () => void = async () => {
     try {
       const { data } = await axios(
         `httpsapp.zipcodebase.com/api/v1/code/state?apikey=${
           import.meta.env.VITE_API_KEY
         }&state_name=${selectedState}&country=US`
       );
       const statePCodesObject: { id: number; name: string }[] = [];
       data.results.forEach((code: any, i: number) =>
         statePCodesObject.push({ id: i, name: code })
       );
       setStatePCodes(statePCodesObject);
       console.log(statePCodesObject)
     } catch (error) {
       console.log(error);
     }
   };
   if (selectedState !== "") {
     getStatePCodes();
   }
 }, [selectedState]);

  const stateOptions: JSX.Element[] = usStateArray.map((state, i) => (
    <option key={i}>{state}</option>
  ));

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (parseInt(pCodeInput) < 1 || parseInt(pCodeInput) > 99950) {
      setAlert({ msg: "Postal Code shoulde remain between 1 and 99950" });
      setTimeout(() => {
        setAlert({ msg: "" });
      }, 2000);
      return;
    }

   try {
     const { data } = await axios(
       `httpsapp.zipcodebase.com/api/v1/search?apikey=${
         import.meta.env.VITE_API_KEY
       }&codes=${pCodeInput}&country=US`
     );
     if (data.results.length < 1) {
       setAlert({ msg: "Couldnt find Postal Code on Database" });
       setTimeout(() => {
         setAlert({ msg: "" });
       }, 2000);
       return;
     }

     setSelectedPCode(data.results[pCodeInput][0]);

     console.log(data);
   } catch (error) {
     console.log(error);
   }

    setSelectedPCode({
      city: "New York",
      city_en: "",
      country_code: "",
      latitude: "",
      longitude: "",
      postal_code: "10005",
      province: "",
      province_code: "",
      state: "",
      state_code: "",
      state_en: "",
    });
  };

  return (
    <>
      <h1 className="w-full font-bold text-2xl md:text-3xl lg:text-4xl text-indigo-900">
        Get info about your Postal Code
      </h1>
      <div
        className="md:w-3/4 w-full border-2 border-solid text-lg md:text-xl lg:text-2xl  rounded-xl shadow-xl bg-slate-200 bg-opacity-75 px-4 m-4"
      >
      <form
        onSubmit={submitHandler}
        className=""
      >
        <input
          type="number"
          value={pCodeInput}
          className="outline-none w-1/2 m-4 p-2 border-2 border-solid rounded-lg"
          onChange={(e) => setPCodeInput(e.target.value)}
          min="1"
          max="99950"
        />
        <input
          type="submit"
          value="Search"
          className="bg-slate-300 text-indigo-900 font-bold px-4 py-2 h-min border-2 border-solid rounded-lg"
        />
      </form>
      <button
          className="bg-slate-300 text-indigo-900 font-bold px-4 py-2 mb-4 h-min border-2 border-solid  rounded-lg"
          onClick={() => setOptionalMenu(prevState => !prevState)}
        >
          Optional: Autocomplete
        </button>
      </div>

      {optionalMenu && <div className="md:w-3/4 w-full m-4 p-4 font-bold border-2 border-solid  rounded-xl shadow-xl bg-slate-200 bg-opacity-75">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full bg-slate-200 bg-opacity-0 outline-none p-2 rounded-xl text-lg md:text-xl lg:text-2xl"
        >
          {stateOptions}
        </select>
      </div>}
      {selectedState !== "Select State" && (
        <div className="w-3/4 font-bold text-xl m-4">
          <ReactSearchAutocomplete
            items={statePCodes}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            fuseOptions={{
              shouldSort: true,
              threshold: 0,
              location: 0,
              distance: 0,
              minMatchCharLength: 1,
              keys: ["name"],
            }}
            styling={{
              height: "44px",
              border: "1px solid #dfe1e5",
              borderRadius: "16px",
              backgroundColor: "white",
              boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
              hoverBackgroundColor: "#eee",
              color: "#212121",
              fontSize: "18px",
              fontFamily: "Arial",
              iconColor: "indigo",
              lineColor: "rgb(232, 234, 237)",
              placeholderColor: "grey",
              clearIconMargin: "3px 14px 0 0",
              searchIconMargin: "0 0 0 16px",
            }}
          />
        </div>
      )}
      {Object.values(selectedPCode)[0].trim() !== "" && (
        <div className="md:w-3/4 w-full m-4 py-2 border-2 border-solid  rounded-xl shadow-xl bg-slate-200 bg-opacity-75 flex justify-center">
          <PostalCodeInfo
            postalCode={selectedPCode.postal_code}
            city={selectedPCode.city}
            province={selectedPCode.province}
            provinceCode={selectedPCode.province_code}
            state={selectedPCode.state}
            stateCode={selectedPCode.state_code}
            setSelectedPCode={setSelectedPCode}
            defaultPCode={defaultPCode}
          />
        </div>
      )}
      {Object.values(alert)[0].trim() !== "" && <div>{alert.msg}</div>}
    </>
  );
};

export default PCodeInput;

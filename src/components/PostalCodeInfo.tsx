const PostalCodeInfo: React.FC<{postalCode: string, city: string, province: string, provinceCode: string, state:string, stateCode: string, setSelectedPCode: Function, defaultPCode: {}}> = (props) => {
  return (
    <div className="w-1/2 mx-5  bg-slate-300 bg-opacity-0 md:flex md:flex-wrap md:gap-2 rounded-xl text-lg md:text-xl lg:text-3xl justify-center">
      <p className="font-bold w-full block uppercase text-indigo-700 my-2">
        Postal Code: {""}
        <span className="font-normal normal-case text-black">{props.postalCode}</span>
      </p>
      <p className="font-bold w-full block uppercase text-indigo-700 my-2">
        City: {""}
        <span className="font-normal normal-case text-black">{props.city}</span>
      </p>
      <p className="font-bold w-full block uppercase text-indigo-700 my-2">
        Province: {""}
        <span className="font-normal normal-case text-black">
          {props.province}
        </span>
      </p>
      <p className="font-bold w-full block uppercase text-indigo-700 my-2">
        Province Code: {""}
        <span className="font-normal normal-case text-black">
          {props.provinceCode}
        </span>
      </p>
      <p className="font-bold w-full block uppercase text-indigo-700 my-2">
        State: {""}
        <span className="font-normal normal-case text-black">
          {props.state}
        </span>
      </p>
      <p className="font-bold w-full block uppercase text-indigo-700 my-2">
        State Code: {""}
        <span className="font-normal normal-case text-black">{props.stateCode}</span>
      </p>
      <button
          className="bg-slate-300 text-indigo-900 font-bold text-lg md:text-xl px-4 py-2 my-4 h-min border-2 border-solid rounded-lg"
          onClick={() => props.setSelectedPCode(props.defaultPCode)}
        >
          Reset
        </button>
    </div>
  );
};

export default PostalCodeInfo;

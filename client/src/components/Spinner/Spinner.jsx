import spinner from "../../assets/spinner.gif";

const Spinner = () => {
  return (
    <div className style={{ width: "100%", display: "flex" }}>
      <img
        style={{ margin: "auto", marginLeft: "50%" }}
        width={150}
        className="spinner"
        src={spinner}
        alt="loading"
      ></img>
    </div>
  );
};

export default Spinner;

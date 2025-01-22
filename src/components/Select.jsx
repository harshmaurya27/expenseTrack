const Select = ({
  label,
  name,
  value,
  id,
  onChange,
  error,
  options,
  defOption,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {defOption && (
          <option value={defOption} hidden>
            {defOption}
          </option>
        )}

        {options.map((option, idx) => {
          return (
            <option key={idx} value={option.toLowerCase()}>
              {option}
            </option>
          );
        })}
      </select>
      <p className="error">{error}</p>
    </div>
  );
};

export default Select;

interface RegisterInputItemsProps {
  name: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; //이벤트 핸들러 함수
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  required: boolean;
  label: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  extraClass?: string;
  autocomplete?: string;
}

const RegisterInputItems = ({
  name,
  type,
  id,
  value,
  onChange,
  onBlur,
  required,
  label,
  minLength,
  placeholder,
  extraClass,
}: RegisterInputItemsProps) => {
  return (
    <div className={`input-box ${extraClass ? extraClass : ""}`}>
      <input
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        className="loginpage"
      />
      <label className={`login-info ${value ? "active" : ""}`}>{label}</label>
    </div>
  );
};

export default RegisterInputItems;

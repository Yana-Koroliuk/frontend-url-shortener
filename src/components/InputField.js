const InputField = ({ label, name, type, value, onChange, error, placeholder, required }) => (
    <div className="mb-4">
        <label className="block text-sm font-bold mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
);

export default InputField;

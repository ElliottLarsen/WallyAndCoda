import { useState, useEffect } from "react";

export default function InputForm({
    initialData,
    httpType,
    fetchData,
    onSubmit,
    onCancel,
    formFields,
    title
}) {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        const fetchAndSetData = async () => {
            const data = await fetchData();
            setFormData(data);
        };
        if (httpType === 'put' && fetchData) {
            fetchAndSetData();
        }

    }, [httpType, fetchData]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <>
            <div className="mini-nav-button">
                <h2>{title}</h2>
                <button onClick={onCancel}>Go Back</button>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    {formFields.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                required={field.required}
                            />
                        </div>
                    ))}
                    <button type='submit'>{httpType === 'post' ? 'Add' : 'Save'}</button>
                </fieldset>
            </form>
        </>
    );
};
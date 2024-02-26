import React, { useState } from 'react';
import { FormData, MultiInputFormProps } from '@/app/directory/interface';
import '../styles/Form.css';

const MultiInputForm: React.FC<MultiInputFormProps> = ({ onSubmit, updatedData }) => {
    const [formData, setFormData] = useState<FormData>({
        donor: updatedData[0]?.donor ? updatedData[0].donor : '',
        panels: updatedData[0]?.panels ? updatedData[0].panels : '',
        barcode: updatedData[0]?.barcode ? updatedData[0].barcode : '',
        source: updatedData[0]?.source ? updatedData[0].source : '',
        date: updatedData[0]?.date ? updatedData[0].date : '',
        amount: updatedData[0]?.amount ? updatedData[0].amount : '',
        observedBy: updatedData[0]?.observedBy ? updatedData[0].observedBy : '',
        status: updatedData[0]?.status ? updatedData[0].status : '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Form validation
        if (formData.donor && formData.panels && formData.barcode) {
            onSubmit(formData);
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div>
            <label>
                Donor:
                <input className="formInput" type="text" name="donor" value={formData.donor} onChange={handleChange} />
            </label>
            <br />

            <label>
                Panels:
                <input className="formInput" type="text" name="panels" value={formData.panels} onChange={handleChange} />
            </label>
            <br />

            <label>
                Barcode:
                <input className="formInput" type="text" name="barcode" value={formData.barcode} onChange={handleChange} />
            </label>
            <br />
            <label>
                Source:
                <input className="formInput" type="text" name="source" value={formData.source} onChange={handleChange} />
            </label>
            <br />

            <label>
                Date:
                <input className="formInput" type="text" name="date" value={formData.date} onChange={handleChange} />
            </label>
            <br />

            <label>
                Amount:
                <input className="formInput" type="text" name="amount" value={formData.amount} onChange={handleChange} />
            </label>
            <br />
            <label>
                ObservedBy:
                <input className="formInput" type="text" name="observedBy" value={formData.observedBy} onChange={handleChange} />
            </label>
            <br />

            <label>
                Status:
                <input className="formInput" type="text" name="status" value={formData.status} onChange={handleChange} />
            </label>
            <br />

            <button type="button" onClick={handleSubmit} style={{ backgroundColor: '#38CC77', border: 'none', outline: 'none', padding: '12px 2rem', borderRadius: '20px', color: '#ffffff', fontWeight: 'bold' }}>
                Submit
            </button>
        </div>
    );
};

export default MultiInputForm;

"use client"
import React, { useState } from 'react';
import "../../styles/Table.css";
import "../../styles/Popup.css";
import Popup from '@/app/components/Popup';
import { tableData } from '../../utils/tableData';
import MultiInputForm from '@/app/components/Form';
import { FormData } from '@/app/directory/interface';
import { FaEllipsisV } from "react-icons/fa";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { MdFolderDelete } from "react-icons/md";

const Home: React.FC = () => {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isPopupVisibleForForm, setPopupVisibilityForForm] = useState(false);
  const [isPopupVisibleForAddData, setPopupVisibilityForAddData] = useState(false);
  const [tableRowData, setTableRowData] = useState<FormData[]>([]);
  const [orderId, setOrderId] = useState<number>(0);
  const [workOrders, setWorkOrders] = useState(tableData);

  const handleAdd = (formData: FormData) => {
    const newWorkOrder = {
      id: workOrders.length + 1,
      donor: formData.donor,
      panels: formData.panels,
      barcode: formData.barcode,
      source: formData.source,
      date: formData.date,
      amount: formData.amount,
      observedBy: formData.observedBy,
      status: formData.status,
    };
    setWorkOrders([...workOrders, newWorkOrder]);
    setPopupVisibilityForAddData(false)
  };

  const handleUpdate = (formData: FormData) => {
    const updatedWorkOrders = workOrders.map((order) =>
      order.id === orderId ? {
        ...order,
        donor: formData.donor,
        panels: formData.panels,
        barcode: formData.barcode,
        source: formData.source,
        date: formData.date,
        amount: formData.amount,
        observedBy: formData.observedBy,
        status: formData.status,
      } : order
    );
    setWorkOrders(updatedWorkOrders);
    handleClosePopup()
    setPopupVisibilityForForm(false);

  };

  const handleDelete = (id: number) => {
    const updatedWorkOrders = workOrders.filter((order) => order.id !== id);
    setWorkOrders(updatedWorkOrders);
    handleClosePopup()
  };

  const handleOpenPopup = (id: number) => {
    setOrderId(id)
    setPopupVisibility(true);
  };

  const handleOpenCreatePopup = () => {
    setPopupVisibilityForAddData(true)
  }

  const handleOpenUpdatePopup = (id: number) => {
    const updatedWorkOrders = workOrders.filter((order) => order.id === id);
    setTableRowData(updatedWorkOrders)
    setPopupVisibilityForForm(true)
  }

  const handleClosePopup = () => {
    setPopupVisibility(false);
    setPopupVisibilityForForm(false);
    setPopupVisibilityForAddData(false);
  };

  return <div>
    <div style={{ display: 'flex', marginTop: '1.5rem', textAlign: 'center' }}>
      <h2>Work Orders</h2>
      <button onClick={handleOpenCreatePopup} style={{ backgroundColor: '#38CC77', border: 'none', outline: 'none', padding: '12px 1rem', borderRadius: '20px', marginLeft: '1rem', color: '#ffffff', fontWeight: 'bold' }}><FaPlus style={{ color: '#ffffff' }} /> React Order</button>
    </div>
    <div style={{ margin: '1.5rem 0' }}>
      <div><span style={{ fontWeight: 'bold' }}>Date:</span> 06/01/2023 - 07/01/2023</div>
      <div></div>
    </div>
    <div className="table-container">
      <table style={{ borderCollapse: 'collapse', width: '100%' }} className='tableHeader'>
        <thead className='thead'>
          <tr className='table-header'>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>ID</th>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>DONOR</th>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>PANELS</th>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>BARCODE</th>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>SOURCE</th>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>DATE</th>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>AMOUNT($)</th>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>OBSERVED BY</th>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>STATUS</th>
            <th className='thHeader' style={{ backgroundColor: '#ccc' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((order) => (
            <tr key={order.id} style={{borderBottom: '1px solid #ccc'}}>
              <td className='tdBody'>{order.id}</td>
              <td className='tdBody'>{order.donor}</td>
              <td className='tdBody'>{order.panels}</td>
              <td className='tdBody'>{order.barcode}</td>
              <td className='tdBody'>{order.source}</td>
              <td className='tdBody'>{order.date}</td>
              <td className='tdBody'>${order.amount}</td>
              <td className='tdBody'>{order.observedBy}</td>
              <td className='tdBody'>{order.status}</td>
              <td className='tdBody'>
                <button onClick={() => handleOpenPopup(order.id)} style={buttonStyle}><FaEllipsisV /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {isPopupVisible && (
      <Popup onClose={handleClosePopup}>
        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 1rem' }}>
          <button onClick={() => handleOpenUpdatePopup(orderId)} style={{ border: 'none', background: 'none', outline: 'none', backgroundColor: '#38CC77', padding: '1rem', borderRadius: '30px' }}><FaPenToSquare style={{ color: '#fff', fontSize: '2rem' }} /></button>
          <button onClick={() => handleDelete(orderId)} style={{ border: 'none', background: 'none', outline: 'none', backgroundColor: '#38CC77', padding: '1rem', borderRadius: '30px' }}><MdFolderDelete style={{ color: '#fff', fontSize: '2rem' }} /></button>
        </div>
      </Popup>
    )}
    {isPopupVisibleForForm && (
      <Popup onClose={handleClosePopup}>
        <MultiInputForm onSubmit={handleUpdate} updatedData={tableRowData} />
      </Popup>
    )}
    {isPopupVisibleForAddData && (
      <Popup onClose={handleClosePopup}>
        <MultiInputForm onSubmit={handleAdd} updatedData={''} />
      </Popup>
    )}
  </div>;
};

const buttonStyle: React.CSSProperties = {
  border: 'none', background: 'none', outline: 'none'
}

export default Home;
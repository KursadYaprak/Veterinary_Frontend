import React, { useState, useEffect } from 'react';
import AvailableDateService from '../../services/AvailableDateService';
import './AvailableDateList.css'; // Stil dosyasını dahil edin

function AvailableDateList() {
  const [availableDates, setAvailableDates] = useState([]);
  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: '',
    doctorId: '',
  });

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const fetchAvailableDates = async () => {
    try {
      const data = await AvailableDateService.getAvailableDates();
      setAvailableDates(data);
    } catch (error) {
      console.error('Error fetching available dates:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await AvailableDateService.createAvailableDate(newAvailableDate);
      fetchAvailableDates();
      setNewAvailableDate({ availableDate: '', doctorId: '' });
    } catch (error) {
      console.error('Error creating available date:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await AvailableDateService.updateAvailableDate(id, newAvailableDate);
      fetchAvailableDates();
    } catch (error) {
      console.error('Error updating available date:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await AvailableDateService.deleteAvailableDate(id);
      fetchAvailableDates();
    } catch (error) {
      console.error('Error deleting available date:', error);
    }
  };

  return (
    <div className="doctor-list-container"> {/* Değiştirildi */}
      <h2>Available Dates</h2>
      <div>
        <input
          type="date"
          value={newAvailableDate.availableDate}
          onChange={(e) => setNewAvailableDate({ ...newAvailableDate, availableDate: e.target.value })}
        />
        <input
          type="number"
          value={newAvailableDate.doctorId}
          onChange={(e) => setNewAvailableDate({ ...newAvailableDate, doctorId: e.target.value })}
          placeholder="Doctor ID"
        />
        <button className="btn-primary mx-2" onClick={handleCreate}>Add New Available Date</button> {/* Değiştirildi */}
      </div>
      <table> {/* Değiştirildi */}
        <thead> {/* Değiştirildi */}
          <tr> {/* Değiştirildi */}
            <th>Date</th> {/* Değiştirildi */}
            <th>Doctor ID</th> {/* Değiştirildi */}
            <th>Action</th> {/* Değiştirildi */}
          </tr> {/* Değiştirildi */}
        </thead> {/* Değiştirildi */}
        <tbody> {/* Değiştirildi */}
          {availableDates.map((date) => (
            <tr key={date.id}> {/* Değiştirildi */}
              <td>{date.availableDate}</td> {/* Değiştirildi */}
              <td>{date.doctorId}</td> {/* Değiştirildi */}
              <td> {/* Değiştirildi */}
                <button className="btn-primary mx-2" onClick={() => handleUpdate(date.id)}>Edit</button> {/* Değiştirildi */}
                <button className="btn-primary mx-2" onClick={() => handleDelete(date.id)}>Delete</button> {/* Değiştirildi */}
              </td> {/* Değiştirildi */}
            </tr> {/* Değiştirildi */}
          ))}
        </tbody> {/* Değiştirildi */}
      </table> {/* Değiştirildi */}
    </div>
  );
}

export default AvailableDateList;

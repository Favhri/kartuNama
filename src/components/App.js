import React, { useState } from "react";
import Header from "./header";
import Footer from "./Footer";

const IDCard = ({
  kampus,
  jalanKampus,
  nama,
  tempatLahir,
  tanggalLahir,
  NIM,
  foto,
  onDelete,
}) => {
  return (
    <div className="id-card">
      <div className="header">
        <h1>{kampus}</h1>
        <h2>{jalanKampus}</h2>
      </div>
      <div className="content">
        <div className="text-info">
          <p>
            <strong>Nama :</strong> {nama}
          </p>
          <p>
            <strong>Tempat Lahir :</strong> {tempatLahir}
          </p>
          <p>
            <strong>Tanggal Lahir :</strong> {tanggalLahir}
          </p>
          <p>
            <strong>NIM :</strong> {NIM}
          </p>
        </div>
        <div className="photo">
          <img src={foto} alt="Foto" />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState({
    kampus: "",
    jalanKampus: "",
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    NIM: "",
    foto: "",
  });

  const [cards, setCards] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { kampus, jalanKampus, nama, tempatLahir, tanggalLahir, NIM } = data;
    if (
      !kampus ||
      !jalanKampus ||
      !nama ||
      !tempatLahir ||
      !tanggalLahir ||
      !NIM
    ) {
      alert("Semua kolom kecuali URL Foto harus diisi!");
      return;
    }
    setCards([...cards, data]);
    setData({
      kampus: "",
      jalanKampus: "",
      nama: "",
      tempatLahir: "",
      tanggalLahir: "",
      NIM: "",
      foto: "",
    });
    setIsEditing(true);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    const [year, month, day] = value.split("-");
    setData((prevData) => ({
      ...prevData,
      tanggalLahir: `${day}/${month}/${year}`,
    }));
  };

  const handleDelete = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="kampus"
          placeholder="Nama Kampus"
          value={data.kampus}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <input
          type="text"
          name="jalanKampus"
          placeholder="Jalan Kampus"
          value={data.jalanKampus}
          onChange={handleChange}
          disabled={!isEditing}
          style={{ fontFamily: "serif" }}
        />
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={data.nama}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <input
          type="text"
          name="tempatLahir"
          placeholder="Tempat Lahir"
          value={data.tempatLahir}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <input
          type="date"
          name="tanggalLahir"
          placeholder="Tanggal Lahir"
          onChange={handleDateChange}
          disabled={!isEditing}
        />
        <input
          type="text"
          name="NIM"
          placeholder="NIM"
          value={data.NIM}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <input
          type="text"
          name="foto"
          placeholder="URL Foto"
          value={data.foto}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <button type="submit">Cetak Kartu</button>
      </form>
      <div className="cards-container">
        {cards.map((cardData, index) => (
          <div key={index}>
            <IDCard {...cardData} />
            <button
              className="delete-button"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;

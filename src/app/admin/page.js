"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const [menu, setMenu] = useState({ categories: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "fatkats2026") {
      setIsAuthenticated(true);
      fetchMenu();
    } else {
      setMessage("Incorrect password. Please try again.");
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch("/api/menu");
      if (res.ok) {
        const data = await res.json();
        setMenu(data);
      }
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (categoryIndex, itemIndex, field, value) => {
    const updatedMenu = { ...menu };
    updatedMenu.categories[categoryIndex].items[itemIndex][field] = value;
    setMenu(updatedMenu);
  };

  const handleCategoryChange = (categoryIndex, field, value) => {
    const updatedMenu = { ...menu };
    updatedMenu.categories[categoryIndex][field] = value;
    setMenu(updatedMenu);
  };

  const handleTableChange = (categoryIndex, rowIndex, valIndex, value) => {
    const updatedMenu = { ...menu };
    updatedMenu.categories[categoryIndex].rows[rowIndex].values[valIndex] = value;
    setMenu(updatedMenu);
  };

  const handleOptionChange = (categoryIndex, optionIndex, field, value) => {
    const updatedMenu = { ...menu };
    updatedMenu.categories[categoryIndex].options[optionIndex][field] = value;
    setMenu(updatedMenu);
  };

  const saveMenu = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      
      if (res.ok) {
        setMessage("Menu updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save menu.");
      }
    } catch (error) {
      setMessage("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="glass-panel" style={{ padding: "40px", maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <h2 style={{ marginBottom: "20px" }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Login</button>
            {message && <p style={{ color: "var(--color-primary)", marginTop: "15px" }}>{message}</p>}
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>Loading menu...</div>;
  }

  return (
    <div className="container" style={{ padding: "80px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <h2>Menu Administration</h2>
        <div>
          <button onClick={() => window.location.href = "/"} className="btn btn-outline" style={{ marginRight: "15px" }}>View Live Site</button>
          <button onClick={saveMenu} className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {message && (
        <div style={{ padding: "15px", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "8px", marginBottom: "30px", borderLeft: "4px solid var(--color-secondary)" }}>
          {message}
        </div>
      )}

      {menu.categories.map((category, catIdx) => (
        <div key={category.id} style={{ marginBottom: "50px" }}>
          <h3 style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "10px", marginBottom: "20px", color: "var(--color-secondary)" }}>
            {category.title}
          </h3>
          
          {category.format === 'table' ? (
            <div className="menu-table-container">
              <div style={{ marginBottom: '20px' }}>
                <label>Banner Image URL / File Path</label>
                <input type="text" value={category.bannerImage || ""} onChange={(e) => handleCategoryChange(catIdx, "bannerImage", e.target.value)} placeholder="/my-banner.jpg" />
              </div>
              <table className="menu-table">
                <thead>
                  <tr>
                    {category.columns.map((col, idx) => <th key={idx}>{col}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {category.rows.map((row, rowIdx) => (
                    <tr key={row.id}>
                      <td style={row.label.startsWith('↳') ? { paddingLeft: '30px', color: 'var(--color-text-muted)' } : {}}>{row.label}</td>
                      {row.values.map((val, valIdx) => (
                        <td key={valIdx}>
                          <input 
                            type="text" 
                            value={val} 
                            onChange={(e) => handleTableChange(catIdx, rowIdx, valIdx, e.target.value)}
                            style={{ width: "80px" }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {category.options && (
                <div style={{ marginTop: '30px' }}>
                  <h4 style={{ marginBottom: '15px', color: 'var(--color-secondary)' }}>Specialty Options</h4>
                  {category.options.map((opt, optIdx) => (
                    <div key={optIdx} className="glass-panel" style={{ padding: "15px", marginBottom: "15px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", alignItems: "start" }}>
                      <div>
                        <label>Option Name</label>
                        <input type="text" value={opt.name} onChange={(e) => handleOptionChange(catIdx, optIdx, "name", e.target.value)} />
                      </div>
                      <div>
                        <label>Description / Ingredients</label>
                        <textarea rows="2" value={opt.description} onChange={(e) => handleOptionChange(catIdx, optIdx, "description", e.target.value)} />
                      </div>
                      <div>
                        <label>Image URL / File</label>
                        <input type="text" value={opt.image || ""} onChange={(e) => handleOptionChange(catIdx, optIdx, "image", e.target.value)} placeholder="/my-pizza.jpg" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            category.items.map((item, itemIdx) => (
              <div key={item.id} className="glass-panel" style={{ padding: "20px", marginBottom: "20px", display: "grid", gridTemplateColumns: "1fr 2fr 100px 1fr", gap: "20px", alignItems: "start" }}>
                <div>
                  <label>Name</label>
                  <input type="text" value={item.name} onChange={(e) => handleItemChange(catIdx, itemIdx, "name", e.target.value)} />
                </div>
                <div>
                  <label>Description / Details</label>
                  <textarea rows="2" value={item.description} onChange={(e) => handleItemChange(catIdx, itemIdx, "description", e.target.value)} />
                </div>
                <div>
                  <label>Price</label>
                  <input type="text" value={item.price} onChange={(e) => handleItemChange(catIdx, itemIdx, "price", e.target.value)} />
                </div>
                <div>
                  <label>Image URL / File</label>
                  <input type="text" value={item.image || ""} onChange={(e) => handleItemChange(catIdx, itemIdx, "image", e.target.value)} placeholder="/food.jpg" />
                </div>
              </div>
            ))
          )}
        </div>
      ))}
      
    </div>
  );
}

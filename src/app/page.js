import fs from 'fs/promises';
import path from 'path';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'data', 'menu.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const menu = JSON.parse(fileContents);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" style={{ padding: '80px 0', textAlign: 'center', background: 'linear-gradient(rgba(30,0,48,0.85), rgba(59,7,100,1)), url(https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop) center/cover' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/logo.png" alt="Fat Kats Logo" style={{ width: '350px', maxWidth: '90%', height: 'auto', marginBottom: '30px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }} />
          <div style={{ marginBottom: '30px', color: 'var(--color-text)', fontSize: '1.1rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
            <p style={{ marginBottom: '8px' }}>📍 15439 Beech Daly, Redford (1 Block North of 5 Mile)</p>
            <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>📞 <a href="tel:3135412000" style={{ color: 'var(--color-primary)' }}>(313) 541-2000</a></p>
            <p>🕒 Mon-Thurs: 4pm-10pm | Fri: 4pm-11pm | Sat: 2pm-11pm | Sun: 2pm-10pm</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#menu" className="btn btn-primary">View Menu</a>
            <a href="/coupons" className="btn btn-primary">✂️ View Coupons</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Fat+Kats+Pizzeria+Redford+MI" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              ⭐️ 4.6/5 on Google Reviews
            </a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container" style={{ padding: '80px 24px' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '60px' }}>Our Menu</h2>

        {menu.categories.map((category) => (
          <div key={category.id} className="menu-category" style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '2rem', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '30px', color: 'var(--color-secondary)' }}>
              {category.title}
            </h3>
            
            {category.format === 'table' ? (
              <div className="menu-table-container">
                {category.bannerImage && (
                  <img src={category.bannerImage} alt={category.title} className="category-banner" />
                )}
                <table className="menu-table">
                  <thead>
                    <tr>
                      {category.columns.map((col, idx) => <th key={idx}>{col}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {category.rows.map((row) => (
                      <tr key={row.id}>
                        <td style={row.label.startsWith('↳') ? { paddingLeft: '30px', color: 'var(--color-text-muted)' } : {}}>{row.label}</td>
                        {row.values.map((val, idx) => <td key={idx}>{val}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {category.options && (
                  <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {category.options.map((opt, idx) => (
                      <div key={idx} className="glass-panel menu-card">
                        {opt.image && <img src={opt.image} alt={opt.name} />}
                        <div className="menu-card-content">
                          <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-primary)' }}>{opt.name}</h4>
                          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{opt.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {category.footer && <p style={{ marginTop: '15px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>* {category.footer}</p>}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {category.items.map((item) => (
                  <div key={item.id} className="glass-panel menu-card" style={{ cursor: 'pointer' }}>
                    {item.image && <img src={item.image} alt={item.name} />}
                    <div className="menu-card-content">
                      <h4 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{item.name}</h4>
                      <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px', flex: 1 }}>{item.description}</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{item.price.startsWith('$') || item.price === 'Included' || item.price.startsWith('Varies') ? item.price : `$${item.price}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
      
      <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} Fat Kats. All rights reserved.</p>
        <p style={{ marginTop: '10px' }}>
          <a href="/admin" style={{ color: 'var(--color-secondary)' }}>Admin Login</a>
        </p>
      </footer>
    </main>
  );
}

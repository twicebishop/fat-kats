import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";

export default async function CouponsPage() {
  const filePath = path.join(process.cwd(), "data", "menu.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  const menu = JSON.parse(jsonData);

  return (
    <div style={{ minHeight: '100vh', padding: '60px 24px', backgroundColor: 'var(--color-background)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" className="btn btn-outline" style={{ display: 'inline-block', marginBottom: '20px' }}>
            &larr; Back to Menu
          </Link>
          
          <div style={{ textAlign: 'center' }}>
            <img src="/logo.png" alt="Fat Kats Logo" style={{ width: '250px', maxWidth: '80%', height: 'auto', marginBottom: '20px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }} />
            <br />
            <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', display: 'inline-block', borderBottom: '4px dashed var(--color-primary)', paddingBottom: '10px', marginBottom: '15px' }}>
              ✂️ Limited Time Coupons
            </h1>
            <p style={{ fontSize: '1.3rem', color: 'var(--color-text-muted)' }}>
              Mention these coupons when ordering to get these great deals!
            </p>
          </div>
        </div>

        {menu.coupons && menu.coupons.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {menu.coupons.map((coupon, idx) => (
              <div key={idx} className="coupon-card">
                <img src="/logo.png" alt="Fat Kats Logo" style={{ height: '40px', objectFit: 'contain', margin: '0 auto 15px auto' }} />
                <h3 style={{ fontSize: '1.6rem', marginBottom: '10px', color: '#fff', fontWeight: 'bold' }}>{coupon.title}</h3>
                <p style={{ fontSize: '1.2rem', marginBottom: coupon.subtitle ? '5px' : '20px', lineHeight: '1.5', color: '#eee' }}>{coupon.description}</p>
                {coupon.subtitle && (
                  <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '20px', color: '#ccc' }}>
                    {coupon.subtitle}
                  </p>
                )}
                
                <div style={{ marginTop: 'auto', background: 'rgba(255, 255, 255, 0.05)', padding: '10px 15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {coupon.prices ? (
                    coupon.prices.map((p, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: pIdx < coupon.prices.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none', paddingBottom: pIdx < coupon.prices.length - 1 ? '8px' : '0' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#eee' }}>{p.size}</span>
                        <span style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--color-primary)' }}>{p.price}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--color-primary)', textAlign: 'center' }}>
                      {coupon.price}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>
            No coupons available at this time.
          </div>
        )}

      </div>
    </div>
  );
}

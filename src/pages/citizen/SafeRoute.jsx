import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet';
import { Navigation, Shield, AlertTriangle } from 'lucide-react';
import { SAFE_ROUTE_HAZARDS } from '../../data/mockData';
import { SeverityBadge } from '../../components/SeverityBadge';
import 'leaflet/dist/leaflet.css';

const COLOR = { minor: '#00cc66', moderate: '#ffaa00', severe: '#ff6600', critical: '#ff4444' };

const safeRoute = [
    [28.6100, 77.2000], [28.6120, 77.2040], [28.6110, 77.2080],
    [28.6130, 77.2110], [28.6150, 77.2140], [28.6170, 77.2200],
];
const alternateRoute = [
    [28.6100, 77.2000], [28.6070, 77.2030], [28.6060, 77.2080],
    [28.6080, 77.2130], [28.6100, 77.2170], [28.6170, 77.2200],
];

const SafeRoute = () => {
    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">Safe Route Planner</h1>
                <p className="page-subtitle">Navigate safely avoiding road hazards in your area</p>
            </div>

            {/* Route Info Banner */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <div className="alert-banner alert-info" style={{ flex: 1 }}>
                    <Navigation size={16} /> Current Route — 2 hazards detected along the way
                </div>
                <div className="alert-banner alert-success" style={{ flex: 1 }}>
                    <Shield size={16} /> Safer Route Available — avoid all severe hazards
                </div>
            </div>

            <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
                {/* Map */}
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-color)', height: 420 }}>
                    <MapContainer center={[28.6130, 77.2100]} zoom={14} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; OpenStreetMap &copy; CARTO'
                        />
                        {/* Routes */}
                        <Polyline positions={safeRoute} color="#ffaa00" weight={4} opacity={0.7} dashArray="8,6" />
                        <Polyline positions={alternateRoute} color="#00cc66" weight={4} opacity={0.9} />
                        {/* Hazard markers */}
                        {SAFE_ROUTE_HAZARDS.map(h => (
                            <CircleMarker key={h.id} center={[h.lat, h.lng]} radius={10}
                                fillColor={COLOR[h.severity]} color={COLOR[h.severity]} fillOpacity={0.85} weight={2}>
                                <Popup>
                                    <strong style={{ color: 'var(--text-primary)' }}>{h.name}</strong>
                                    <br /><span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{h.distance}</span>
                                </Popup>
                            </CircleMarker>
                        ))}
                    </MapContainer>
                </div>

                {/* Hazard List & Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div className="section-card">
                        <div className="section-title" style={{ marginBottom: 12 }}><AlertTriangle size={16} color="var(--yellow)" /> Hazards Along Route</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {SAFE_ROUTE_HAZARDS.map(h => (
                                <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLOR[h.severity], flexShrink: 0, display: 'inline-block' }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{h.name}</p>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{h.distance}</p>
                                    </div>
                                    <SeverityBadge severity={h.severity} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="section-card">
                        <div className="section-title" style={{ marginBottom: 10 }}>Route Legend</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 30, height: 3, background: '#00cc66', borderRadius: 2 }} />
                                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Safer alternate route (recommended)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 30, height: 3, background: '#ffaa00', borderRadius: 2, borderStyle: 'dashed' }} />
                                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Current route (2 hazards)</span>
                            </div>
                        </div>
                    </div>

                    <div className="alert-banner alert-critical">
                        <span className="blink"><AlertTriangle size={14} /></span>
                        <div>
                            <p style={{ fontSize: 12, fontWeight: 600 }}>Critical Hazard On Route</p>
                            <p style={{ fontSize: 11 }}>Severe pothole detected at NH-44 Km 34 — route detour recommended</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafeRoute;

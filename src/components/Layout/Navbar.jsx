import React, { useState, useEffect } from 'react';
import { Bell, Sun, Moon, ChevronDown, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ALERTS } from '../../data/mockData';
import './Navbar.css';

const Navbar = () => {
    const { user } = useAuth();
    const [showNotif, setShowNotif] = useState(false);
    const [hasCritical] = useState(ALERTS.some(a => a.type === 'critical' && !a.read));
    const unread = ALERTS.filter(a => !a.read).length;

    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest('.notif-container')) setShowNotif(false);
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    return (
        <header className="navbar">
            <div className="navbar-left">
                {hasCritical && (
                    <div className="critical-banner">
                        <span className="blink"><AlertTriangle size={13} /></span>
                        <span>Critical alert on MG Road — immediate action required</span>
                    </div>
                )}
            </div>

            <div className="navbar-right">
                {/* Notifications */}
                <div className="notif-container">
                    <button
                        className={`icon-btn ${hasCritical ? 'pulse-btn' : ''}`}
                        onClick={() => setShowNotif(s => !s)}
                        aria-label="Notifications"
                    >
                        <Bell size={17} />
                        {unread > 0 && <span className="notif-badge">{unread}</span>}
                    </button>

                    {showNotif && (
                        <div className="notif-dropdown">
                            <div className="notif-header">
                                <span>Notifications</span>
                                <span className="notif-count">{unread} unread</span>
                            </div>
                            <div className="notif-list">
                                {ALERTS.slice(0, 5).map(a => (
                                    <div key={a.id} className={`notif-item ${a.read ? 'read' : ''} ${a.type === 'critical' ? 'notif-critical' : ''}`}>
                                        <span className="notif-icon">{a.icon}</span>
                                        <div>
                                            <p className="notif-title">{a.title}</p>
                                            <p className="notif-time">{a.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* User Avatar */}
                <div className="user-pill">
                    <div className="user-avatar">{user?.avatar}</div>
                    <div className="user-info">
                        <span className="user-name">{user?.name}</span>
                        <span className="user-role">{user?.role}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

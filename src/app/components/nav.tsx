import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { sidebarMenu } from '../utils/sidebarMenu';

type NavProps = {
    collaps: boolean;
    setCollaps: (collapsed: boolean) => void;
    setActivePage: (page: string) => void;
    activePage: string;
};

const Nav: React.FC<NavProps> = ({ setCollaps, collaps, setActivePage, activePage }) => { 
    return (
        <div style={wrapNavContainerStyle}>
            <div className="avatar">
                <img src="https://cdn.pixabay.com/photo/2016/06/14/14/09/skeleton-1456627_1280.png" alt="Avatar" style={{ height: 40 }}/>
            </div>
            <div onClick={() => setCollaps(!collaps)} style={wrapNavIconStyle}>{collaps ? <FaArrowRight /> : <FaArrowLeft />}</div>
            <ul style={wrapNavUlList}>
                {sidebarMenu.map((item, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                        <span onClick={() => setActivePage(item.label)} style={{ color: activePage === item.label ? 'rgba(56,204,119,0.8)' : '#111' }}>{item.icon}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const wrapNavContainerStyle: React.CSSProperties = { border: '1px solid #ccc', display: 'flex', flexDirection: 'column', height: '100vh', padding: '0.5rem' }
const wrapNavIconStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }
const wrapNavUlList: React.CSSProperties = {listStyle: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem', paddingTop: '1rem'}

export default Nav

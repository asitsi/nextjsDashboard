import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from './nav';
import { sidebarMenu } from '../utils/sidebarMenu';
import { FaAngleRight } from 'react-icons/fa';
import { Item } from '../directory/interface';

interface SidebarProps {
  onMenuItemClick: (menuItem: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuItemClick }) => {
  const [collaps, setCollaps] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<string>('home');
  const [activeSubPage, setActiveSubPage] = useState<string>('')
  const [menuItems, setMenuItem] = useState<any>();

  useEffect(() => {
    const filterMenu = sidebarMenu.filter(item => item.label === activePage);
    setMenuItem(filterMenu[0]?.menus)
  }, [activePage]);

  return (
    <div className="sidebar" style={{ display: 'flex' }}>
      <Nav collaps={collaps} setCollaps={setCollaps} setActivePage={setActivePage} activePage={activePage} />
      {collaps ?
        <div style={{padding: '0 1rem'}}>
          <h1 style={{marginTop: '1rem'}}>{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h1>
          <ul style={wrapNavUlList}>
            {menuItems?.map((item: Item, index: number) => (
              <li key={index} style={{ display: 'flex' }} onClick={()=> setActiveSubPage(item.lable)}>
                <Link href={item.path} style={{ padding: '1rem 0.8rem', border: '1px solid #ccc', width: '250px', borderRadius: '25px', backgroundColor: activeSubPage === item.lable ? 'rgba(56,204,119,0.2)' : '' }}>
                  <span onClick={() => { onMenuItemClick(item.lable) }} ><div style={wrapNavLiListLinkLable}>{item.lable} <FaAngleRight style={{ color: activeSubPage === item.lable ? 'rgba(56,204,119,0.8)' : ''}}/></div></span>
                </Link>
              </li>
            ))}
          </ul>
        </div> : null}
    </div>
  );
};

const wrapNavUlList: React.CSSProperties = { listStyle: 'none', display: 'flex', padding: '1rem 0.5rem', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }
const wrapNavLiListLinkLable: React.CSSProperties = {display: 'flex', justifyContent: 'space-between'}
export default Sidebar;

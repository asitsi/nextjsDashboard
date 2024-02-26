import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { MdOutlineSettingsSuggest, MdOutlinePowerSettingsNew, MdAutoGraph } from "react-icons/md";
import { GiHistogram } from "react-icons/gi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { PiUsersFourLight } from "react-icons/pi";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export const sidebarMenu = [{
    label: 'home',
    icon: <FaHome />,
    menus: [
        { lable: 'Face Recognition', icon: <FaUser/>, path: '/' },
        { lable: 'Daily Visit', icon: '', path: '/' },
        { lable: 'Donate', icon: '', path: '/' },
        { lable: 'Work Orders', icon: '', path: '/pages/work-order' },
        { lable: 'Reports', icon: '', path: '/pages/reports' },
        { lable: 'Report History', icon: '', path: '/pages/reports' },
        { lable: 'Test History', icon: '', path: '/pages/reports' },
        { lable: 'Calender Type', icon: '', path: '/pages/calendar' }
    ]
},
{
    label: '',
    icon: <FaMoneyCheckDollar />
},
{
    label: '',
    icon: <GiHistogram />
},
{
    label: '',
    icon: <PiUsersFourLight />
},
{
    label: '',
    icon: <MdOutlineSettingsSuggest />
},
{
    label: '',
    icon: <BsFillQuestionCircleFill />
},
{
    label: '',
    icon: <MdAutoGraph />
},
{
    label: '',
    icon: <MdOutlinePowerSettingsNew />
}
]
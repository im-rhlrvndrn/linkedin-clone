import React from 'react';

// icons
import InfoIcon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// styles
import './Widgets.scss';

const Widgets = () => {
    const news = [
        { title: 'Coronavirus India: ', subtitle: 'Top news - 999 new cases' },
        { title: 'Coronavirus India: ', subtitle: 'Top news - 999 new cases' },
        { title: 'Coronavirus India: ', subtitle: 'Top news - 999 new cases' },
        { title: 'Coronavirus India: ', subtitle: 'Top news - 999 new cases' },
    ];

    return (
        <div className='widget'>
            <div className='widget__header'>
                <h2>LinkedIn News</h2>
                <InfoIcon />
            </div>
            {news.map(({ title, subtitle }) => (
                <div className='widget__news'>
                    <div className='widget__news__left'>
                        <FiberManualRecordIcon />
                    </div>
                    <div className='widget__news__right'>
                        <h2>{title}</h2>
                        <p>{subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Widgets;

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export const GlobalFilter = ({ filter, setFilter }) => 
{
    const styles = StyleSheet.create({
        input: {
            width:'20rem',
            background:'#F2F1F9', 
            border:'1px', 
            padding:'0.5rem', 
            borderStyle:'solid', 
            margin:'1rem',
            ':hover': {
                background: 'white'
            }
        },
      });

    return (
        <div>
            <span>
                {' '}
                <input className={css(styles.input)} value={filter || ''} onChange={(e) => setFilter(e.target.value)} placeholder="Search Products"/>
            </span>
        </div>
    )
}
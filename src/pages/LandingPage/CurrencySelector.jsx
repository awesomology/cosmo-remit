import React, { useState, useRef, useEffect } from 'react'
import styles from './CurrencySelector.module.css'

function CurrencySelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)  // Reference to the dropdown container
  
  const currencies = [
    { code: 'UK', name: 'British Pound', flag: '🇬🇧', icon: '/src/assets/homepage/britFlag.svg' },
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', icon: '/src/assets/homepage/nigFlag.svg' },
  ]
  
  const selected = currencies.find(c => c.code === value) || currencies[0]
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])  // Re-run when isOpen changes
  
  return (
    <div className={styles.customSelect} ref={dropdownRef}>
      <div 
        className={styles.selectTrigger} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={selected.icon} alt={selected.code} className={styles.flagIcon} />
        <span>{selected.code}</span>
        {/* SVG Chevron Icon - changes color based on state */}
        <svg 
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      
      {isOpen && (
        <ul className={styles.selectOptions}>
          {currencies.map(currency => (
            <li 
              key={currency.code}
              onClick={() => {
                onChange({ target: { value: currency.code } })
                setIsOpen(false)  // Close after selection
              }}
              className={styles.selectOption}
            >
              <img src={currency.icon} alt={currency.code} className={styles.flagIcon} />
              <span>{currency.code} - {currency.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CurrencySelector
let qtySubtract = document.querySelector('#qty-subtract');
function faqTabSection() {
    
    document.querySelectorAll(".faq-tab").forEach(tab => {
        tab.addEventListener('click', () => {
          // Close all tabs
          document.querySelectorAll(".faq-tab").forEach(t => {
            if (t !== tab) {
              t.querySelector('.solution').style.display = 'none';
              t.classList.remove('active');
            }
        })
        // Toggle the clicked tab
          const content = tab.querySelector('.solution');
          const isActive = tab.classList.contains('active');
      
          content.style.display = isActive ? 'none' : 'block';
          tab.classList.toggle('active', !isActive);
        });
      });

} 
faqTabSection()
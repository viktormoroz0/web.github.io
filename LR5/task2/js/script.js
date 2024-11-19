function generate() {
    // Border-radius values
    const rtl = document.getElementById('rtl').value;
    const rtr = document.getElementById('rtr').value;
    const rbr = document.getElementById('rbr').value;
    const rbl = document.getElementById('rbl').value;

    // Update corresponding text inputs
    document.getElementById('ttl').value = rtl;
    document.getElementById('ttr').value = rtr;
    document.getElementById('tbr').value = rbr;
    document.getElementById('tbl').value = rbl;

    // Float value
    const floatValue = document.getElementById('float-value').value;

    // Font-family value
    const fontFamilyValue = document.getElementById('font-family-value').value;

    // Block and Code elements
    const block = document.getElementById('block');
    const code = document.getElementById('code');

    // Apply styles
    block.style.borderRadius = `${rtl}px ${rtr}px ${rbr}px ${rbl}px`;
    block.style.float = floatValue;
    block.style.fontFamily = fontFamilyValue;

    // Generate CSS code
    code.value = `
border-radius: ${rtl}px ${rtr}px ${rbr}px ${rbl}px;
float: ${floatValue};
font-family: ${fontFamilyValue};
    `.trim();
}

function switchTab(event, tabId) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tabs li').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tabContent').forEach(content => content.classList.remove('active'));

    // Add active class to the selected tab and content
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

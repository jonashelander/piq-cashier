export default function App() {
  const [iframeUrl, setIframeUrl] = useState(null);
  useEffect(() => {
    if (iframeUrl) {
      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.src = iframeUrl;
      iframe.width = "100%";
      iframe.height = "500px"; // Set height as needed
      iframe.style.border = "none";
      // Append the iframe to a container div
      const container = document.getElementById("iframe-container");
      container.innerHTML = ""; // Clear any existing content in the container
      container.appendChild(iframe);
    }
  }, [iframeUrl]);
  useEffect(() => {
    // Reset HostedFields before setting up
    HostedFields.reset();
    // Configure your fields
    let fieldConfig = [
      {
        type: FieldTypes.TEXT,
        id: "frmNameCC",
        autocomplete: "cc-name",
        key: "creditcard.main.name",
        helpKey: "Testing",
        name: "ccname",
        noAttributeValueFormatting: true,
        required: true,
        requiredNewPayment: true,
        requiredRepeatPayment: false,
        showIcon: true,
        value: undefined,
        visible: true,
        visibleOnNewPayment: true,
        visibleOnRepeatPayment: false,
      },
      {
        type: FieldTypes.CREDITCARD_NUMBER,
        autocomplete: "cc-number",
        helpKey: "Card Number",
        id: "frmCCNum",
        key: "creditcard.main.number",
        name: "cardnumber",
        noAttributeValueFormatting: true,
        required: true,
        requiredNewPayment: true,
        requiredRepeatPayment: false,
        showIcon: true,
        value: undefined,
        visible: true,
        visibleOnNewPayment: true,
        visibleOnRepeatPayment: false,
      },
      {
        type: FieldTypes.EXPIRY_MM_YYYY,
        autocomplete: "cc-exp",
        helpKey: "•• / ••",
        id: "frmCCExp",
        key: "creditcard.main.expirymmyyyy",
        name: "cc-exp",
        noAttributeValueFormatting: true,
        pattern: "[0-9]*",
        required: true,
        requiredNewPayment: true,
        requiredRepeatPayment: false,
        showIcon: true,
        value: undefined,
        visible: true,
        visibleOnNewPayment: true,
        visibleOnRepeatPayment: false,
      },
      {
        type: FieldTypes.CVV,
        autocomplete: "cc-csc",
        helpKey: "Security Code",
        id: "frmCCCVC",
        key: "creditcard.main.cvc",
        name: "cvc",
        noAttributeValueFormatting: true,
        pattern: "[0-9]*",
        required: true,
        requiredNewPayment: true,
        requiredRepeatPayment: true,
        showIcon: true,
        value: undefined,
        visible: true,
        visibleOnNewPayment: true,
        visibleOnRepeatPayment: true,
      },
    ];
    const setupConfig = {
      merchantId: 1014,
      renderMode: "single", // render all fields in a single iframe
      hostedfieldsurl:
        "https://test-hostedpages.paymentiq.io/1.0.31/index.html",
      fields: fieldConfig,
      service: "",
      styles: style,
      callback: (formData) => {
        return formCallbackHandler;
      },
      onLoadCallback: () => {
        return formHasLoadedCallbackHandler;
      },
      autoFocusNext: true,
      el: `#hosted-fields-wrapper`,
    };
    const setupHostedFields = () => {
      HostedFields.setup(setupConfig);
    };
    setupHostedFields();
  });
}

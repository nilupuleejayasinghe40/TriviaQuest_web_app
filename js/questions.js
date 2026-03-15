// ========== ICT / Computer Basics Question Bank ==========
// Each question has: question, options (array of 4), answer (index 0-3), difficulty

const questionBank = {
  easy: [
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Central Program Utility", "Computer Personal Unit", "Central Processor Unifier"],
      answer: 0
    },
    {
      question: "Which of the following is an input device?",
      options: ["Monitor", "Printer", "Keyboard", "Speaker"],
      answer: 2
    },
    {
      question: "What does RAM stand for?",
      options: ["Read Access Memory", "Random Access Memory", "Run Application Memory", "Rapid Access Module"],
      answer: 1
    },
    {
      question: "Which of these is an operating system?",
      options: ["Google Chrome", "Microsoft Word", "Windows 11", "Photoshop"],
      answer: 2
    },
    {
      question: "What is the main function of a hard drive?",
      options: ["Process data", "Display images", "Store data permanently", "Connect to the internet"],
      answer: 2
    },
    {
      question: "What does 'www' stand for in a web address?",
      options: ["Wide Web World", "World Wide Web", "Web World Wide", "World Web Wide"],
      answer: 1
    },
    {
      question: "Which unit is used to measure the speed of a processor?",
      options: ["Megabytes", "Gigahertz", "Pixels", "Watts"],
      answer: 1
    },
    {
      question: "What does USB stand for?",
      options: ["Universal Serial Bus", "United System Base", "Universal System Bus", "Ultra Speed Buffer"],
      answer: 0
    },
    {
      question: "Which of these is a web browser?",
      options: ["Excel", "PowerPoint", "Firefox", "Outlook"],
      answer: 2
    },
    {
      question: "What is the smallest unit of data in a computer?",
      options: ["Byte", "Kilobyte", "Bit", "Megabyte"],
      answer: 2
    },
    {
      question: "Which device is used to print documents?",
      options: ["Scanner", "Monitor", "Printer", "Mouse"],
      answer: 2
    },
    {
      question: "What does 'HTML' stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
      answer: 0
    },
    {
      question: "Which of these is an output device?",
      options: ["Keyboard", "Mouse", "Monitor", "Scanner"],
      answer: 2
    },
    {
      question: "How many bytes are in 1 kilobyte?",
      options: ["100", "512", "1024", "1000"],
      answer: 2
    },
    {
      question: "What does 'Wi-Fi' help you do?",
      options: ["Print documents", "Connect to the internet wirelessly", "Charge your phone", "Store files"],
      answer: 1
    },
    {
      question: "Which key is used to delete the character before the cursor?",
      options: ["Delete", "Backspace", "Enter", "Tab"],
      answer: 1
    },
    {
      question: "What type of software is Microsoft Word?",
      options: ["System software", "Application software", "Utility software", "Firmware"],
      answer: 1
    },
    {
      question: "What does 'PDF' stand for?",
      options: ["Portable Document Format", "Print Data File", "Personal Document Folder", "Program Data Format"],
      answer: 0
    },
    {
      question: "Which one of these is volatile memory?",
      options: ["Hard Drive", "SSD", "RAM", "USB Flash"],
      answer: 2
    },
    {
      question: "What is the full form of 'LAN'?",
      options: ["Large Area Network", "Local Access Node", "Local Area Network", "Linked Area Network"],
      answer: 2
    }
  ],
  medium: [
    {
      question: "Which protocol is used to send emails?",
      options: ["HTTP", "FTP", "SMTP", "TCP"],
      answer: 2
    },
    {
      question: "What is the primary purpose of an operating system?",
      options: ["Run games", "Manage hardware and software resources", "Browse the internet", "Create documents"],
      answer: 1
    },
    {
      question: "What does 'IP' stand for in IP address?",
      options: ["Internet Program", "Internet Protocol", "Internal Process", "Input Protocol"],
      answer: 1
    },
    {
      question: "Which of the following is NOT a programming language?",
      options: ["Python", "Java", "HTML", "C++"],
      answer: 2
    },
    {
      question: "What does BIOS stand for?",
      options: ["Basic Integrated Operating System", "Basic Input Output System", "Binary Input Output Standard", "Base Internal Operation System"],
      answer: 1
    },
    {
      question: "What is phishing in cyber security?",
      options: ["A type of virus", "Fishing on the internet", "A fraudulent attempt to obtain sensitive information", "Blocking a website"],
      answer: 2
    },
    {
      question: "Which topology connects all devices to a single central cable?",
      options: ["Star", "Bus", "Ring", "Mesh"],
      answer: 1
    },
    {
      question: "What does SQL stand for?",
      options: ["Structured Query Language", "Simple Question Language", "System Query Logic", "Standard Query Library"],
      answer: 0
    },
    {
      question: "Which of these is a relational database management system?",
      options: ["Photoshop", "MySQL", "Windows", "Chrome"],
      answer: 1
    },
    {
      question: "What is the function of a router?",
      options: ["Store data", "Display web pages", "Direct network traffic between devices", "Print documents"],
      answer: 2
    },
    {
      question: "What does SSD stand for?",
      options: ["Solid State Drive", "System Storage Device", "Super Speed Disk", "Standard System Drive"],
      answer: 0
    },
    {
      question: "Which of the following is an example of cloud storage?",
      options: ["USB Drive", "Hard Disk", "Google Drive", "DVD"],
      answer: 2
    },
    {
      question: "What does HTTPS 'S' stand for?",
      options: ["Simple", "Standard", "Secure", "System"],
      answer: 2
    },
    {
      question: "In binary, what is the decimal value of 1010?",
      options: ["8", "10", "12", "14"],
      answer: 1
    },
    {
      question: "What is malware?",
      options: ["A hardware component", "Malicious software", "A type of firewall", "A programming language"],
      answer: 1
    },
    {
      question: "Which layer of the OSI model is responsible for routing?",
      options: ["Data Link", "Transport", "Network", "Session"],
      answer: 2
    },
    {
      question: "What is the purpose of a firewall?",
      options: ["Speed up internet", "Monitor and filter network traffic", "Store passwords", "Compress files"],
      answer: 1
    },
    {
      question: "What does 'GUI' stand for?",
      options: ["General User Input", "Graphical User Interface", "Global Unified Integration", "Graphical Universal Interaction"],
      answer: 1
    },
    {
      question: "Which of these file extensions is for a spreadsheet?",
      options: [".docx", ".xlsx", ".pptx", ".pdf"],
      answer: 1
    },
    {
      question: "What is an algorithm?",
      options: ["A computer virus", "A step-by-step procedure to solve a problem", "A type of hardware", "A programming language"],
      answer: 1
    }
  ],
  hard: [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      answer: 2
    },
    {
      question: "Which of the following is a private IP address range?",
      options: ["8.8.8.0 – 8.8.8.255", "192.168.0.0 – 192.168.255.255", "200.0.0.0 – 200.255.255.255", "172.32.0.0 – 172.63.255.255"],
      answer: 1
    },
    {
      question: "What is the default subnet mask for a Class C network?",
      options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
      answer: 2
    },
    {
      question: "In the OSI model, which layer handles encryption and decryption?",
      options: ["Application", "Presentation", "Session", "Transport"],
      answer: 1
    },
    {
      question: "What does RAID stand for?",
      options: ["Redundant Array of Independent Disks", "Random Access Integrated Data", "Rapid Array of Internal Drives", "Reliable Automated Integrated Disks"],
      answer: 0
    },
    {
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
      answer: 2
    },
    {
      question: "What is a 'man-in-the-middle' attack?",
      options: ["A virus that replicates itself", "An attacker intercepts communication between two parties", "A brute force password attack", "A denial of service attack"],
      answer: 1
    },
    {
      question: "What is normalization in databases?",
      options: ["Making data larger", "Organizing data to reduce redundancy", "Encrypting data", "Backing up data"],
      answer: 1
    },
    {
      question: "Which of the following uses asymmetric encryption?",
      options: ["AES", "DES", "RSA", "Blowfish"],
      answer: 2
    },
    {
      question: "What is the purpose of DNS?",
      options: ["Assign IP addresses automatically", "Translate domain names to IP addresses", "Encrypt web traffic", "Filter spam emails"],
      answer: 1
    },
    {
      question: "What does the 'volatile' keyword mean in programming?",
      options: ["The variable is constant", "The variable may change unexpectedly", "The variable is global", "The variable is private"],
      answer: 1
    },
    {
      question: "Which data structure uses FIFO (First In, First Out)?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: 1
    },
    {
      question: "What is a virtual machine?",
      options: ["A physical server", "Software that emulates a computer system", "A type of hard drive", "A web browser"],
      answer: 1
    },
    {
      question: "What protocol does DHCP use to assign IP addresses?",
      options: ["TCP", "UDP", "ICMP", "ARP"],
      answer: 1
    },
    {
      question: "In hexadecimal, what is 'FF' in decimal?",
      options: ["128", "200", "255", "512"],
      answer: 2
    },
    {
      question: "What is the function of the ALU in a CPU?",
      options: ["Store data temporarily", "Perform arithmetic and logical operations", "Manage memory allocation", "Control input devices"],
      answer: 1
    },
    {
      question: "What does the term 'latency' refer to in networking?",
      options: ["Data transfer speed", "Delay before data transfer begins", "Amount of data transferred", "Network bandwidth"],
      answer: 1
    },
    {
      question: "Which of these is a NoSQL database?",
      options: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"],
      answer: 2
    },
    {
      question: "What is a deadlock in operating systems?",
      options: ["When the CPU overheats", "When two or more processes are waiting for each other indefinitely", "When memory is full", "When a file is corrupted"],
      answer: 1
    },
    {
      question: "What is the maximum number of hosts in a /24 subnet?",
      options: ["256", "254", "255", "128"],
      answer: 1
    }
  ]
};

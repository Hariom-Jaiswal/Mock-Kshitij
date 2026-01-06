export interface TeamMemberData {
    name: string;
    image: string;
    role?: string; // Optional for individual members if role is defined at group level
}

export interface CommitteeDept {
    role: string;
    members: TeamMemberData[];
}

export const chairpersonData: TeamMemberData = {
    name: "BHOOMI SHAH",
    role: "CHAIRPERSON",
    image: "/CoreTeam/bhoomi.png"
};

export const viceChairpersonsData: TeamMemberData[] = [
    { name: "PRATHAM MARU", role: "VICE CHAIRPERSON", image: "/CoreTeam/pratham maru.png" },
    { name: "SOUMYA PATTNAIK", role: "VICE CHAIRPERSON", image: "/CoreTeam/soumya pattnaik.png" },
    { name: "RUDRAKSH DAVE", role: "VICE CHAIRPERSON", image: "/CoreTeam/rudraksh dave.png" },
    { name: "KRISH GALA", role: "VICE CHAIRPERSON", image: "/CoreTeam/krish gala.png" },
    { name: "LUBHAWANI SINGHAL", role: "VICE CHAIRPERSON", image: "/CoreTeam/lubhawani singhal.png" },
    { name: "SAMBHAV JAIN", role: "VICE CHAIRPERSON", image: "/CoreTeam/sambhav jain.png" },
];

export const coreCommitteeData: CommitteeDept[] = [
    {
        role: "GRAPHICS",
        members: [
            { name: "AASHI SHAH", image: "/CoreTeam/AASHI SHAH 1.png" },
            { name: "DIYA GOYAL", image: "/CoreTeam/DIYA GOYAL 1.png" },
            { name: "HIYA BARADIA", image: "/CoreTeam/HIYA BARADIA 1.png" }
        ]
    },
    {
        role: "TECHNICALS",
        members: [
            { name: "HARSH RATHOD", image: "/CoreTeam/HARSH RATHOD 1.png" }
        ]
    },
    {
        role: "PHOTOGRAPHY",
        members: [
            { name: "SIDDHANT SHETH", image: "/CoreTeam/SIDDHANT SHETH.png" },
            { name: "GAURAV KHUTWAD", image: "/CoreTeam/GAURAV KHUTWAD.png" },
            { name: "RAJVEER GALA", image: "/CoreTeam/RAJVEER GALA.png" }
        ]
    },
    {
        role: "DIGITAL MEDIA",
        members: [
            { name: "SIYA NAGPAL", image: "/CoreTeam/SIYA NAGPAL.png" },
            { name: "JHAKAHEE SHAH", image: "/CoreTeam/JHAAKHEE SHAH.png" }
        ]
    },
    {
        role: "ARTIST RELATIONS",
        members: [
            { name: "ADI CHHEDA", image: "/CoreTeam/ADI CHHEDA.png" }
        ]
    },
    {
        role: "CREATIVE & FINE ARTS",
        members: [
            { name: "URVI SALVI", image: "/CoreTeam/URVI SALVI.png" },
            { name: "VEDIKA PATIL", image: "/CoreTeam/VEDIKA PATIL.png" }
        ]
    },
    {
        role: "LITERARY ARTS",
        members: [
            { name: "HABIBA BHAVNAGARWALA", image: "/CoreTeam/HABIBA BHAVNAGARWALA.png" },
            { name: "VIDHI SHAH", image: "/CoreTeam/VIDHI SHAH.png" }
        ]
    },
    {
        role: "MARKETING",
        members: [
            { name: "PRANAV SHAH", image: "/CoreTeam/pranav shah 1.png" },
            { name: "KAZMAIRA SHARMA", image: "/CoreTeam/kazmaira sharma.png" },
            { name: "KRISHNA IYER", image: "/CoreTeam/krishna iyer.png" }
        ]
    },
    {
        role: "INFORMALS",
        members: [
            { name: "SAUMYA PAREKH", image: "/CoreTeam/SAUMYA PAREKH.png" },
            { name: "NEEV MEHTA", image: "/CoreTeam/NEEV MEHTA.png" }
        ]
    },
    {
        role: "PERFORMING ARTS",
        members: [
            { name: "VAISHNAVI PRASAD", image: "/CoreTeam/VAISHNAVI PRASAD.png" },
            { name: "ANAHITA SONI", image: "/CoreTeam/ANAHITA SONI.png" }
        ]
    },
    {
        role: "PRODUCTIONS",
        members: [
            { name: "NEEV GALA", image: "/CoreTeam/NEEV GALA.png" },
            { name: "YUG DHAROD", image: "/CoreTeam/yug dharod.png" }
        ]
    },
    {
        role: "GAMING & SPORTS",
        members: [
            { name: "PRATHAM SANGANI", image: "/CoreTeam/PRATHAM SANGANI.png" },
            { name: "MANOGYA AGRAWAL", image: "/CoreTeam/MANOGYA AGRAWAL.png" }
        ]
    },
    {
        role: "BRANDING & SUPPLIES",
        members: [
            { name: "KRISH PATEL", image: "/CoreTeam/KRISH PATEL.png" },
            { name: "SWASTIKA BHARANI", image: "/CoreTeam/SWASTIKA BHARANI.png" },
            { name: "PRASHOON BHATTACHARJEE", image: "/CoreTeam/PRASHOON BHATTACHARJEE.png" }
        ]
    },
    {
        role: "COLLEGE RELATION",
        members: [
            { name: "DISHITA PATEL", image: "/CoreTeam/DISHITA PATEL.png" },
            { name: "ZAKI PATEL", image: "/CoreTeam/ZAKI PATEL.png" },
            { name: "TANVI JHAVERI", image: "/CoreTeam/TANVI JHAVERI.png" }
        ]
    },
    {
        role: "PUBLIC RELATIONS",
        members: [
            { name: "HETVI SHAH", image: "/CoreTeam/HETVI SHAH.png" },
            { name: "SAMARTH MARODIA", image: "/CoreTeam/SAMARTH MARODIA.png" },
            { name: "MOKSHA MEHTA", image: "/CoreTeam/MOKSHA MEHTA.png" }
        ]
    },
    {
        role: "SECURITY",
        members: [
            { name: "JAINAAM SHAH", image: "/CoreTeam/JAINAAM SHAH 1.png" },
        ]
    },
    {
        role: "BUSINESS EVENTS",
        members: [
            { name: "NAMEET CHHEDA", image: "/CoreTeam/NAMEET CHHEDA.png" },
            { name: "KANISHKA THORAT", image: "/CoreTeam/KANISHKA THORAT.png" },
        ]
    },
    {
        role: "FINANCE",
        members: [
            { name: "TIRTH MANDAWAT", image: "/CoreTeam/TIRTH MANDAWAT 1.png" },
        ]
    },
    {
        role: "HOSPITALITY",
        members: [
            { name: "MAULI LATHIYA", image: "/CoreTeam/MAULI LATHIYA.png" },
            { name: "MEIYESHA SHARMA", image: "/CoreTeam/MEIYESHA SHARMA.png" },
        ]
    },
];

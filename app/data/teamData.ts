export interface TeamMemberData {
    name: string;
    image: string;
    role?: string;
    phone?: string;
}

export interface CommitteeDept {
    role: string;
    members: TeamMemberData[];
}

export const chairpersonData: TeamMemberData = {
    name: "BHOOMI SHAH",
    role: "CHAIRPERSON",
    image: "/CoreTeam/bhoomi.png",
    phone: "+91 91670 80760"
};

export const viceChairpersonsData: TeamMemberData[] = [
    { name: "PRATHAM MARU", role: "VICE CHAIRPERSON", image: "/CoreTeam/pratham maru.png", phone: "+91 98200 95729" },
    { name: "SOUMYA PATTNAIK", role: "VICE CHAIRPERSON", image: "/CoreTeam/soumya pattnaik.png", phone: "+91 88618 49596" },
    { name: "RUDRAKSH DAVE", role: "VICE CHAIRPERSON", image: "/CoreTeam/rudraksh dave.png", phone: "+91 97690 97906" },
    { name: "KRISH GALA", role: "VICE CHAIRPERSON", image: "/CoreTeam/krish gala.png", phone: "+91 81042 44956" },
    { name: "LUBHAWANI SINGHAL", role: "VICE CHAIRPERSON", image: "/CoreTeam/lubhawani singhal.png", phone: "+91 94141 00974" },
    { name: "SAMBHAV JAIN", role: "VICE CHAIRPERSON", image: "/CoreTeam/sambhav jain.png", phone: "+91 62643 57877" },
];

export const coreCommitteeData: CommitteeDept[] = [
    {
        role: "GRAPHICS",
        members: [
            { name: "AASHI SHAH", image: "/CoreTeam/AASHI SHAH 1.png", phone: "+91 98334 43100" },
            { name: "DIYA GOYAL", image: "/CoreTeam/DIYA GOYAL 1.png", phone: "+91 96191 92703" },
            { name: "HIYA BARADIA", image: "/CoreTeam/HIYA BARADIA 1.png", phone: "+91 99872 61245" }
        ]
    },
    {
        role: "TECHNICALS",
        members: [
            { name: "HARSH RATHOD", image: "/CoreTeam/HARSH RATHOD 1.png", phone: "+91 93723 33980" }
        ]
    },
    {
        role: "PHOTOGRAPHY",
        members: [
            { name: "SIDDHANT SHETH", image: "/CoreTeam/SIDDHANT SHETH.png", phone: "+91 70453 16563" },
            { name: "GAURAV KHUTWAD", image: "/CoreTeam/GAURAV KHUTWAD.png", phone: "+91 70451 00125" },

            { name: "RAJVEER GALA", image: "/CoreTeam/RAJVEER GALA.png", phone: "" }

        ]
    },
    {
        role: "DIGITAL MEDIA",
        members: [
            { name: "SIYA NAGPAL", image: "/CoreTeam/SIYA NAGPAL.png", phone: "+91 93243 57085" },
            { name: "JHAKAHEE SHAH", image: "/CoreTeam/JHAAKHEE SHAH.png", phone: "+91 98337 14771" }
        ]
    },
    {
        role: "ARTIST RELATIONS",
        members: [
            { name: "ADI CHHEDA", image: "/CoreTeam/ADI CHHEDA.png", phone: "+91 98199 75840" }
        ]
    },
    {
        role: "CREATIVE & FINE ARTS",
        members: [
            { name: "URVI SALVI", image: "/CoreTeam/URVI SALVI.png", phone: "+91 99202 72383" },
            { name: "VEDIKA PATIL", image: "/CoreTeam/VEDIKA PATIL.png", phone: "+91 93260 94454" }
        ]
    },
    {
        role: "LITERARY ARTS",
        members: [
            { name: "HABIBA BHAVNAGARWALA", image: "/CoreTeam/HABIBA BHAVNAGARWALA.png", phone: "+91 93246 28352" },
            { name: "VIDHI SHAH", image: "/CoreTeam/VIDHI SHAH.png", phone: "+91 77087 06398" }
        ]
    },
    {
        role: "MARKETING",
        members: [
            { name: "PRANAV SHAH", image: "/CoreTeam/pranav shah 1.png", phone: "+91 93724 94781" },
            { name: "KAZMAIRA SHARMA", image: "/CoreTeam/kazmaira sharma.png", phone: "+91 87004 98333" },
            { name: "KRISHNA IYER", image: "/CoreTeam/krishna iyer.png", phone: "+91 98672 29066" }
        ]
    },
    {
        role: "INFORMALS",
        members: [
            { name: "SAUMYA PAREKH", image: "/CoreTeam/SAUMYA PAREKH.png", phone: "+91 75068 68823" },
            { name: "NEEV MEHTA", image: "/CoreTeam/NEEV MEHTA.png", phone: "+91 98670 60407" }
        ]
    },
    {
        role: "PERFORMING ARTS",
        members: [
            { name: "VAISHNAVI PRASAD", image: "/CoreTeam/VAISHNAVI PRASAD.png", phone: "+91 88284 17008" },
            { name: "ANAHITA SONI", image: "/CoreTeam/ANAHITA SONI.png", phone: "+91 79773 71726" }
        ]
    },
    {
        role: "PRODUCTIONS",
        members: [
            { name: "NEEV GALA", image: "/CoreTeam/NEEV GALA.png", phone: "+91 98201 69190" },
            { name: "YUG DHAROD", image: "/CoreTeam/yug dharod.png", phone: "+91 79773 44143" }
        ]
    },
    {
        role: "GAMING & SPORTS",
        members: [
            { name: "PRATHAM SANGANI", image: "/CoreTeam/PRATHAM SANGANI.png", phone: "+91 93266 72270" },
            { name: "MANOGYA AGRAWAL", image: "/CoreTeam/MANOGYA AGRAWAL.png", phone: "+91 90983 54693" }
        ]
    },
    {
        role: "BRANDING & SUPPLIES",
        members: [
            { name: "KRISH PATEL", image: "/CoreTeam/KRISH PATEL.png", phone: "+91 90760 23918" },
            { name: "SWASTIKA BHARANI", image: "/CoreTeam/SWASTIKA BHARANI.png", phone: "+91 94035 23603" },
            { name: "PRASHOON BHATTACHARJEE", image: "/CoreTeam/PRASHOON BHATTACHARJEE.png", phone: "+91 77383 51376" }
        ]
    },
    {
        role: "COLLEGE RELATION",
        members: [
            { name: "DISHITA PATEL", image: "/CoreTeam/DISHITA PATEL.png", phone: "+91 73022 00000" },
            { name: "ZAKI PATEL", image: "/CoreTeam/ZAKI PATEL.png", phone: "+91 98196 15972" },
            { name: "TANVI JHAVERI", image: "/CoreTeam/TANVI JHAVERI.png", phone: "+91 82916 26560" }
        ]
    },
    {
        role: "PUBLIC RELATIONS",
        members: [
            { name: "HETVI SHAH", image: "/CoreTeam/HETVI SHAH.png", phone: "+91 87793 87620" },
            { name: "SAMARTH MARODIA", image: "/CoreTeam/SAMARTH MARODIA.png", phone: "+91 91706 43099" },
            { name: "MOKSHA MEHTA", image: "/CoreTeam/MOKSHA MEHTA.png", phone: "+91 97025 35489" }
        ]
    },
    {
        role: "SECURITY",
        members: [
            { name: "JAINAAM SHAH", image: "/CoreTeam/JAINAAM SHAH 1.png", phone: "+91 99699 26444" }
        ]
    },
    {
        role: "BUSINESS EVENTS",
        members: [
            { name: "NAMEET CHHEDA", image: "/CoreTeam/NAMEET CHHEDA.png", phone: "+91 88301 78421" },
            { name: "KANISHKA THORAT", image: "/CoreTeam/KANISHKA THORAT.png", phone: "+91 70589 13050" }
        ]
    },
    {
        role: "FINANCE",
        members: [
            { name: "TIRTH MANDAWAT", image: "/CoreTeam/TIRTH MANDAWAT 1.png", phone: "+91 78783 18392" }
        ]
    },
    {
        role: "HOSPITALITY",
        members: [
            { name: "MAULI LATHIYA", image: "/CoreTeam/MAULI LATHIYA.png", phone: "+91 87796 81885" },
            { name: "MEIYESHA SHARMA", image: "/CoreTeam/MEIYESHA SHARMA.png", phone: "+91 98335 72209" }
        ]
    }
];

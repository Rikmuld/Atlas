﻿module Technologies {
    export type TechCat = TechCatagory
    export type Tech = Technology

    export let catagories: TechCatagory[] = []
    export let techs: Technology[] = Array(19)

    export let storage: TechCatagory
    export let consumption_green: TechCatagory
    export let conumption_efficient: TechCatagory
    export let fossile_fuels: TechCatagory
    export let renewable_energy: TechCatagory
    export let clean_energy: TechCatagory

    export let BATTERIES = 0
    export let H2_STORAGE = 1
    export let GREEN_CITY = 2
    export let GREEN_FOOD = 3
    export let GREEN_HOUSING = 4
    export let GREEN_MINING = 5
    export let GREEN_TRANSPORT = 6
    export let BIOFEUL = 7
    export let NUCLEAR_FISSON = 8
    export let NUCLEAR_FUSION = 9
    export let COAL = 10
    export let GAS = 11
    export let OIL = 12
    export let EFFICIENT_FOOD = 13
    export let EFFICIENT_MINING = 14
    export let EFFICIENT_TRANSPORT = 15
    export let HYDRO = 16
    export let SOLAR = 17
    export let WIND = 18

    const WIND_DESC = 'Wind energy is energy generated from the wind by huge multi blade rotors that drive emission-free turbines on the shore. On the other hand, storing is still a problem for wind energy. Furthermore, horizon pollution is something to think of as well.'
    const SOLAR_DESC = 'Solar energy is energy generated from the sunlight through big solar panel farms. A downside to this technology is it\'s irregular production of energy and the problems with storing the energy.'
    const HYDRO_DESC = 'Hydropower uses water to generate energy through big installations in dams and mountains. Even though water is being used, it is not consumed. Polluting gases such as methane and carbon dioxide are being released in the reservoir. You need mountains or rivers in your nations for this technology.'

    const COAL_DESC = 'Coal is generally abundant, cheap, easy to store, and easy to use. However, coal is the dirtiest form of energy production in terms of CO2 emissions. The only way to significantly reduce CO2 emissions while still using coal is through expensive carbon capture and storage (CCS) technologies.'
    const OIL_DESC = 'Oil is the most used technology in transportation, but is causes heavy pollution. Although investing in it might give you a big advantage. You will be able to raise your production speed, lower the rate at which you burn through natural resources. Moneywise this could be decent, environment wise it questionable.'
    const GAS_DESC = 'Natural gas is the cleanest-burning and most energy efficient fossil fuel. However, the extraction of natural gas is often harmful to the environment, especially when techniques such as fracking are used.'

    const NUCLEAR_FUS_DESC = 'Nuclear fusion generates power the same way as the sun, by fusing atoms. This technology could solve all energy problems, the technology is safe, very clean, and resources will last for bilions of years. The problemn however is that this technology still needs a lot of expensive researach which might take decades.'
    const NUCLEAR_FIS_DESC = 'Nuclear fission, or nuclear power as it is mostly known, uses nuclear reactions to product energy. Nucleaer power is a lot more clean then fossile fuels and resources won\'t run out anytime soon. Nuclear power has a bad public image though, due to the radioactive waist and prior exploding power plants.'
    const BIOFUEL_DESC = 'Biofuel is fuel that is produced through contemporary biological processes. Investing in biofuel will decrease the amount of fossil fuels that are being used. Downsides to this technology is a lot more expensive and still now entirely clean.'

    const BATTERIES_DESC = 'Developing battery technologeis will be a very costly operation, but they are expected to become the holy grail of energy storage. With batteries energy loss in grids can be minimized, and technologies consuming electricity (such as electric cars) will become more efficient.'
    const H2O_STORAGE_DESC = 'Chesmical storage is storing power with molocules such as hydrogen. Cemical storage is cheaper then developing new battiery technoloiges due to the exiting infrastrucutre. Devloping chemical storage can reduce the energy loss in energy grids, but have less potential then new batteries.'

    const GREEN_FOOD_DESC = 'The food that is used to sustain a population has a significantly negative environmental impact. Primarily, meat production is a major contributor to climate change. Green food technologies minimize the energy and carbon footprint associated with food production.'
    const GREEN_CITY_DESC = 'More then half of the population life in cities. Green city technologies aim to make a city more sustainable, this will reduce the carbon foodprint of your population and reduce the smog in cities which might lead to a happier population. Remodeling cities however, is no cheap investment to make.'
    const GREEN_HOUSING_DESC = 'Green housing employs features such as good insulation, small surface area of the house, and ventilation to minimize the environmental impact of housing. Thus, houses will require less energy for heating, cooling, construction, and destruction.'
    const GREEN_TRANSPORTATION_DESC = 'Transportation is accountable for 25% of the world\'s energy demand. Making this sector greener, thus using less energy, or renewable resources as fuels would have quite some effect on the total energy market.'

    const EFFICIENT_MINING_DESC = 'Efficient mining technoloiges will enable you to get more resources out of the ground in your country and it will also cost less energy to mine your resources. Furthemore you are generating less pollution with your mining.'
    const EFFICIENT_TRANSPORTATION_DESC = 'Researching in efficient transportation will increase the speed of transport and lower the price the consumers have to pay for it. This might go with a little more pollution and a bit more energy consumption, but a big happiness improvement will be the result.'
    const EFFICIENT_FOOD_DESC = 'Efficient food maximizes the food production rate. by increasing the food supply, it decreases the food prices for the population. However, such an increase in efficiency requires a greater investment from the player and it would increase the energy and pollution footprint of the food production.'

    export let icons: SpriteGrix
    export let xp: ShapeGrix

    export function update() {
        for (let tech of techs) if(tech)tech.update()
    }

    export function init() {
        console.log("Loading Technologies")

        icons = Grix.fromSprite(Textures.iconSprite)

        xp = Grix.shape()
        xp.circle(200, 0, 0, 0, true, 100, 100)
        xp.drawmode(gl.TRIANGLE_FAN, 0)
        let ind = [0]

        for (let i = 1; i < 101; i++) {
            xp.drawmode(gl.TRIANGLE_FAN, i)
            xp.addIndicie(ind.concat([0]), i)
            ind.push(i)
        }

        xp.populate()

        fossile_fuels = new TechCatagory("Fossile Fuels", new Color("98A3A3"))
        clean_energy = new TechCatagory("Clean Energy", new Color("34495E"))
        renewable_energy = new TechCatagory("Renewable Energy", new Color("3478B6"))
        storage = new TechCatagory("Storage", new Color("16A085"))
        consumption_green = new TechCatagory("Green Use", new Color("2ECC71"))
        conumption_efficient = new TechCatagory("Efficient Use", new Color("E67E22"))

        new Batteries("Batteries", BATTERIES_DESC, getStarRating(0, 0, 0), storage)
        new H2Storage("Cemical Storage", H2O_STORAGE_DESC, getStarRating(0, 0, 0), storage)
        new GreenTransport("Sustainable Transportation", GREEN_TRANSPORTATION_DESC, getStarRating(0, 0, 0), consumption_green)
        new GreenFood("Sustainable Food Production", GREEN_FOOD_DESC, getStarRating(0, 0, 0), consumption_green)
        new GreenCity("Sustainable Cities", GREEN_CITY_DESC, getStarRating(0, 0, 0), consumption_green)
        new GreenHousing("Sustainable Housing", GREEN_HOUSING_DESC, getStarRating(0, 0, 0), consumption_green)
        new EfficientFood("Efficient Food Production", EFFICIENT_FOOD_DESC, getStarRating(0, 0, 0), conumption_efficient)
        new EfficientTransport("Efficient Transport", EFFICIENT_TRANSPORTATION_DESC, getStarRating(0, 0, 0), conumption_efficient)
        new EfficientMining("Efficient Mining", EFFICIENT_MINING_DESC, getStarRating(0, 0, 0), conumption_efficient)
        new Coal("Coal", COAL_DESC, getStarRating(0, 0, 0), fossile_fuels)
        new Oil("Oil", OIL_DESC, getStarRating(0, 0, 0), fossile_fuels)
        new Gas("Natural Gas", GAS_DESC, getStarRating(0, 0, 0), fossile_fuels)
        new Wind("Wind Turbines", WIND_DESC, getStarRating(0, 0, 0), renewable_energy)
        new Solar("Solar Panels", SOLAR_DESC, getStarRating(0, 0, 0), renewable_energy)
        new Hydro("Hydro Power", HYDRO_DESC, getStarRating(0, 0, 0), renewable_energy)
        new NuclearFission("Nuclear Fission", NUCLEAR_FIS_DESC, getStarRating(0, 0, 0), clean_energy)
        new BioFuel("Bio Fuel", BIOFUEL_DESC, getStarRating(0, 0, 0), clean_energy)
        new NuclearFusion("Nuclear Fusion", NUCLEAR_FUS_DESC, getStarRating(0, 0, 0), clean_energy)
    }

    export function getTech(id: number): Technology {
        return techs[id]
    }

    class TechCatagory {
        private color: Col
        private name: string
        private techs: number[] = []

        constructor(name: string, color: Col) {
            this.color = color
            this.name = name

            catagories.push(this)
        }

        addTech(technology: Technology) {
            this.techs.push(technology.getId())
        }

        getColor(): Col {
            return this.color
        }

        getTechIDs(): number[] {
            return this.techs
        }

        getName(): string {
            return this.name
        }
    }

    abstract class Technology {
        private description: string
        private name: string
        private texture: number
        private id: number

        private starRating: StarRating
        private catagory: TechCatagory

        private inResearch: boolean
        private researchLevel: number
        private development: number
        private developmentLevel: number = 0

        constructor(id: number, texture: number, name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            this.id = id
            this.texture = texture
            this.name = name
            this.description = description

            this.starRating = starRating
            this.catagory = catagory

            this.development = 0

            catagory.addTech(this)

            console.log("Setting up: " + name + " in " + catagory.getName())
            techs[id] = this
        }

        getDescription(): string {
            return this.description
        }

        getName(): string {
            return this.name
        }

        render(x: number, y: number, scale: number, rxp: boolean = true) {
            if (rxp) {
                xp.scaleTo(scale * 1.1, scale * 1.1)

                let col = this.catagory.getColor()
                let color = new Color(col.r() * 0.7, col.g() * 0.7, col.b() * 0.7)

                xp.setColor(color)
                xp.setPivotMove(0.5, 0.5)
                xp.moveTo(x, y)
                xp.rotateDeg(-90)
                xp.setIndex([0])
                xp.render()

                let level = this.development / this.getResearchNeeded(this.developmentLevel + 1)
                xp.setIndex([Math.floor(level * 100) + 1])

                color = new Color(col.r() * 1.3, col.g() * 1.3, col.b() * 1.3)
                xp.setColor(color)
                xp.render()
            }

            Plena.forceRender()

            icons.activeImg(this.getTexture())
            icons.scaleTo(scale, scale)
            icons.setPivotMove(0.5, 0.5)
            icons.moveTo(x, y)
            icons.render()
        }

        getTexture(): string {
            return Textures.getTechIcon(this.texture)
        }

        getId(): number {
            return this.id
        }

        getStars(): StarRating {
            return this.starRating
        }

        isInResearch(): boolean {
            return this.inResearch
        }

        enableResearch(level: number) {
            if (this.canResearch(level)) {
                this.inResearch = true
                this.researchLevel = level
            }
        }

        stopResearch() {
            this.inResearch = false
        }

        update() {
            if (this.inResearch) {
                this.research(this.researchLevel)
            }
        }

        getResearchLevel(): number {
            return this.researchLevel
        }

        research(level: number) {
            if (this.canResearch(level)) {
                Nation.subMoney(this.getResearchCost(level))
                this.development += this.getResearchSpeed(level)
                if (this.canUpgrade()) {
                    this.developmentLevel += 1
                    this.development = 0
                    //OrchestraBot.setActiveBottext(TECH UPGFRADE)
                }
            } else {
                this.inResearch = false
                //OrchestraBot.setActiveBottext(RESEARCHE STOPPED)
            }
        }

        abstract getResearchNeeded(level: number): number
        abstract getResearchSpeed(level: number): number
        abstract getResearchCost(level: number): number

        canResearch(level: number):boolean {
            return this.developmentLevel < 4 && this.getResearchCost(level) < Nation.getMoney()
        }

        canUpgrade(): boolean {
            return this.development > this.getResearchNeeded(this.developmentLevel + 1)
        }

        getDevelopmentLevel(): number {
            return this.developmentLevel
        }
    }

    interface StarRating {
        green: number
        money: number
        resources: number
    }

    function getStarRating(green: number, money: number, resources: number): StarRating {
        return { green: green, money: money, resources: resources }
    }

    class Batteries extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(BATTERIES, 0, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class H2Storage extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(H2_STORAGE, 5, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class GreenCity extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_CITY, 15, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class GreenFood extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_FOOD, 16, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class GreenHousing extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_HOUSING, 17, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class GreenMining extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_MINING, 18, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class GreenTransport extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_TRANSPORT, 19, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class BioFuel extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(BIOFEUL, 1, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class NuclearFission extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(NUCLEAR_FISSON, 6, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class NuclearFusion extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(NUCLEAR_FUSION, 11, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class Oil extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(OIL, 12, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class Coal extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(COAL, 2, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class Gas extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GAS, 7, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class EfficientFood extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(EFFICIENT_FOOD, 3, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class EfficientMining extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(EFFICIENT_MINING, 8, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class EfficientTransport extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(EFFICIENT_TRANSPORT, 13, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class Hydro extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(HYDRO, 4, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class Solar extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(SOLAR, 9, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }

    class Wind extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(WIND, 14, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return level * 1000
        }

        getResearchSpeed(level: number): number {
            return 1
        }

        getResearchCost(level: number): number {
            return 1
        }
    }
}
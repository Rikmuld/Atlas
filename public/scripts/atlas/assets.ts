﻿module Textures {
    export let worldSprite: Sprite
    export let iconSprite: Sprite
    export let mapImg: Img
    export let nation: Img
    export let cities: Sprite

    export let fontBig: Font
    export let fontSmall: Font
    export let fontMapSmall: FontMap

    export function load() {
        console.log("Registering Assets")

        worldSprite = Assets.loadSprite("/images/worldUtils.png", Assets.TILE_SHEET)
        mapImg = Assets.loadImg("/images/worldMap.png", Assets.NORMAL)
        iconSprite = Assets.loadSprite("/images/techs.png", Assets.TILE_SHEET)
        nation = Assets.loadImg("/images/nation.png", Assets.NORMAL)
        cities = Assets.loadSprite("/images/cities.png", Assets.TILE_SHEET)

        cities.addImgs([NationSprite.CITY_GREEN, NationSprite.CITY_POLLUTED], 0, 0, 901, 433, 2, true)
        cities.addImg(NationSprite.CLOUDY, 0, 866, 171, 71)
        cities.addImg(NationSprite.DOCK, 0, 1484, 1254, 612)
        cities.addImg(NationSprite.BALLOON, 0, 936, 131, 234)

        let icons = [NationSprite.IC_SUN, NationSprite.IC_WIND, NationSprite.IC_SIZE, NationSprite.IC_FERTILE,
            NationSprite.IC_MONEY, NationSprite.IC_COAL, NationSprite.IC_ENERGY, NationSprite.IC_NATURAL,
            NationSprite.IC_MOUNT]

        cities.addImgs(icons, 0, 1300, 100, 100, 9)

        let names = []
        for (let name = 0; name < 20; name++) {
            names.push(name.toString())
        }
        iconSprite.addImgs(names, 0, 0, 395, 395, 20)

        worldSprite.addImg(WorldSprite.CLOUDS, 0, 0, 1024, 1024)
        worldSprite.addImg(WorldSprite.BACK, 1024, 0, 1024, 1024)
        worldSprite.addImg(WorldSprite.CRESANT, 0, 1024, 1024, 1024)
        worldSprite.addImg(WorldSprite.DOCK, 1024, 1024, 433, 101)
        worldSprite.addImg(WorldSprite.BUBBLE, 1024, 1135, 299, 48)
        worldSprite.addImg(WorldSprite.SPUTNIK, 1536, 1024, 148, 148)
        worldSprite.addImg(WorldSprite.ICON_WORLD, 1024, 1586, 200, 200)
        worldSprite.addImg(WorldSprite.ICON_NATIO, 1224, 1586, 200, 200)
        worldSprite.addImg(WorldSprite.ICON_STORE, 1424, 1586, 200, 200)
        worldSprite.addImg(WorldSprite.ICON_LEAVE, 1624, 1586, 200, 200)
        worldSprite.addImg(WorldSprite.DOCK_SIDE, 1025, 1182, 88, 377)
        worldSprite.addImg(WorldSprite.DOCK_SIDER, 1113, 1182, 280, 101)
        worldSprite.addImg(WorldSprite.NATION_CLICK_DOCK, 1114, 1296, 55, 147)
        worldSprite.addImgs([WorldSprite.NATION_C_TALK, WorldSprite.NATION_C_EYE, WorldSprite.NATION_C_HAND], 1176, 1302, 42, 42, 3)

        worldSprite.addImgs([WorldSprite.ICON_CO2,
            WorldSprite.ICON_RES,
            WorldSprite.ICON_TEM,
            WorldSprite.ICON_HAP,
            WorldSprite.ICON_POP], 65 * 20, 65 * 21, 65, 65, 5)

        fontBig = new Font(Font.CONSOLAS, 48).fill(new Color(250, 250, 250))
        fontSmall = new Font(Font.CONSOLAS, 40).fill(new Color(250, 250, 250))

        fontMapSmall = Assets.mkFontMap(fontSmall, Assets.LETTERS, FontMap.BASIC_KEYS + "ⅠⅡⅢⅣⅤ²")
    }

    export namespace NationSprite {
        export const CITY_GREEN = "greenCity"
        export const CITY_POLLUTED = "pollutedCity"
        export const CLOUDY = "cloudy"
        export const BALLOON = "balloon"
        export const DOCK = "dock"
        export const IC_SUN = "sun"
        export const IC_WIND = "wind"
        export const IC_SIZE = "size"
        export const IC_FERTILE = "fertile"
        export const IC_MONEY = "money"
        export const IC_COAL = "coal"
        export const IC_ENERGY = "energy"
        export const IC_NATURAL = "natural"
        export const IC_MOUNT = "mountain"
    }

    export namespace WorldSprite {
        export const CLOUDS = "clouds"
        export const BACK = "back"
        export const CRESANT = "cresant"
        export const DOCK = "dock"
        export const DOCK_SIDE = "dockSide"
        export const DOCK_SIDER = "dockSideR"
        export const BUBBLE = "bubble"
        export const SPUTNIK = "sputnik"
        export const ICON_STORE = "store"
        export const ICON_WORLD = "world"
        export const ICON_NATIO = "nation"
        export const ICON_LEAVE = "exit"
        export const ICON_CO2 = "co2"
        export const ICON_RES = "res"
        export const ICON_TEM = "tem"
        export const ICON_HAP = "hap"
        export const ICON_POP = "pop"
        export const NATION_CLICK_DOCK = "ncdock"
        export const NATION_C_EYE = "eye"
        export const NATION_C_HAND = "hand"
        export const NATION_C_TALK = "talk"
    }

    export function getTechIcon(index: number):string {
        return index.toString()
    }
}
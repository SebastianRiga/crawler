import { assets } from '../environment/assets';

const images = assets.images.classes;

export interface CharacterClass {
    name: string;
    description: string;
    image: string;
    icon: string;
}

export const WarriorClass: CharacterClass = {
    name: 'Warrior',
    description: `Warriors are distinguished from the common skirmisher by their devotion to the
    ideals of honor and by the surpassing excellence of their fighting ability.`,
    image: images.warrior.key,
    icon: images.warriorIcon.key,
};

export const RougeClass: CharacterClass = {
    name: 'Rouge',
    description: `Rogues are agile and stealthy thieves, with knowledge of locks, traps, and poisons.
    Their advantage lies in surprise, which they employ to great advantage.`,
    image: images.rouge.key,
    icon: images.rougeIcon.key,
};

export const HunterClass: CharacterClass = {
    name: 'Hunter',
    description: `Hunters are most at home in the woods, and some say slightly out of place in a dungeon.
    They are, however, experts in archery as well as tracking and stealthy movement.`,
    image: images.hunter.key,
    icon: images.hunterIcon.key,
};

export const MageClass: CharacterClass = {
    name: 'Mage',
    description: `Mages start out with a knowledge of magic, a selection of magical items, and a particular
    affinity for dweomercraft. Although seemingly weak and easy to overcome at first sight, an experienced Mage is a deadly foe.`,
    image: images.mage.key,
    icon: images.mageIcon.key,
};

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let thisVam = this;
    while (thisVam.creator) {
      thisVam = thisVam.creator;
      count++;
    }
    return count;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const thisLevel = this.numberOfVampiresFromOriginal;
    const thatLevel = vampire.numberOfVampiresFromOriginal;

    return thisLevel < thatLevel;

  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let currentVam = this;
    let desiredVam = null;



    if (currentVam.name === name) {
      return currentVam;
    } else {
      for (let children of currentVam.offspring) {
        desiredVam = children.vampireWithName(name);
        if (desiredVam) {
          return desiredVam;
        }
      }
      return null;
    }


  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let vamNum = 0;

    if (this.numberOfOffspring === 0) {
      return 0;
    } else {
      for (let childVam of this.offspring) {
        vamNum += 1;
        vamNum += childVam.totalDescendents;
      }
    }
    return vamNum;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = [];
    if (this.yearConverted >= 1980) {
      vampires.push(this);
    }

    for (let vamp of this.offspring) {
      vampires = vampires.concat(vamp.allMillennialVampires);
    }

    return vampires;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    if (this.creator === vampire) {
      return vampire;
    }

    if (vampire.creator === this) {
      return this;
    }




  }
}

module.exports = Vampire;


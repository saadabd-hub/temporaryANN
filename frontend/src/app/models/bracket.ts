export interface NgttTournament {
  rounds: NgttRound[];
}

export interface NgttRound {
  /**
   * The type determines in which branch to place a match.
   * SingleElimination-Trees only consist of a Winnerbracket and a Final-Bracket
   */
  type: 'Winnerbracket' | 'Loserbracket' | 'Final';
  matches: any[];
}

function solution(A: number[]): number {    

    let sortedA = Array.from(new Set<number>(A.sort((n1, n2) => n1 - n2).filter(n => n > 0)));
    let smallest = 1;

    if(sortedA.length === 0) {
        return 1;
    }

    for(let i = 0; i <= sortedA.length; i++) {
        if(sortedA[i] !== i + 1) {
            smallest = i + 1;
            break;
        }
    }
    return smallest;
}
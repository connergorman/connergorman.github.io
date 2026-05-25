import random
import math
def gcd(a: int, b: int) -> int:
    if b == 0:
        return a
    r = a % b
    
    return gcd(b, r)

def estiamte_pi(max):
    count = 0
    for i in range(max):
        a = random.randint(1,1_000_000_000)
        b = random.randint(1,1_000_000_000)
        if a > b:
            _gcd = gcd(a,b)
        else:
            _gcd = gcd(b,a)
        if _gcd == 1:
            count+=1
    mu = float(count) / float(max)
    est = math.sqrt(6 / mu)
    print(f"# samples: {max}, Pi:{est}")


if __name__ == "__main__":
    for i in [10, 100, 1000, 100_000, 1_000_000, 10_000_000]:
        estiamte_pi(i)

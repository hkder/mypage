---
title: "Federated Learning, from First Principles"
date: 2026-09-14
tags: [federated-learning, machine-learning]
series: "Learning Federated Learning"
summary: "A first look at learning across separate datasets, one round of FedAvg, and the experiment I want to build next."
image:
  src: /images/federated-garden.webp
  alt: Three paper trees on separate islands, with roots connected to a shared seed
  width: 680
  height: 453
draft: false
---

Today I'm starting a series on federated learning. This first note is a starting point: a small example to make the mechanism concrete, followed by questions to test. There are no benchmark results here yet.

## The starting question

Suppose three teams each have a dataset. They want a better model, but collecting everyone's raw examples in one place is not an option. Can they learn together while keeping those examples local?

In federated learning, participants train locally and exchange model information. A coordinating server can combine their updates into a shared model. The data stays with each participant; information learned from it still travels.

A *client* simply means a participant. It could be a phone, a laboratory, or an organization. A *model parameter* is one of the numbers adjusted during training.

## One round of FedAvg

[Federated Averaging, or FedAvg](https://proceedings.mlr.press/v54/mcmahan17a.html), gives us a concrete starting algorithm:

1. The server sends the same current model to selected clients.
2. Each client trains that model on its own examples for a specified amount of local work.
3. Clients return their resulting model parameters.
4. The server forms a weighted average, using the clients' example counts as weights.

That sequence is one *communication round*. The next round starts from the newly combined model. Here I'm discussing the standard sample-weighted form; other weighting rules change the objective.

### A tiny worked example

To see the arithmetic, imagine a model with just one parameter. These numbers are invented for illustration:

| Client | Training examples | Parameter after local training |
| --- | ---: | ---: |
| A | 100 | 0.8 |
| B | 300 | 1.2 |

Client A contributes one quarter of the examples and B contributes three quarters. The combined parameter is:

<div class="math" role="math" aria-label="One quarter times 0.8 plus three quarters times 1.2 equals 1.1">¼ × 0.8 + ¾ × 1.2 = 1.1</div>

An equal average would be 1.0. That is a different choice: it gives the two clients equal influence, regardless of their dataset sizes. For a larger model, the same weighted operation is applied to corresponding parameters.

```python
# One scalar parameter, two clients; no training occurs here.
examples_a, examples_b = 100, 300
parameter_a, parameter_b = 0.8, 1.2

total = examples_a + examples_b
combined = (
    examples_a * parameter_a + examples_b * parameter_b
) / total
print(f"{combined:.1f}")  # 1.1
```

## Keeping data local is not a privacy proof

A model update is still information about training data. [Deep Leakage from Gradients](https://papers.nips.cc/paper_files/paper/2019/hash/60a6c4002cc7b29142def8871531281a-Abstract.html) demonstrates that shared gradients can reveal training examples under the attack settings studied by its authors.

That result does not mean every federated system exposes every example. It means “we never upload raw data” is insufficient as a privacy argument. A real system needs an explicit threat model: who can observe what, and what are they allowed to infer?

## The first experiment I want to run

I want to begin with a small supervised classification task and compare three setups:

- **Local:** each client trains using only its own data.
- **Pooled:** one model trains on the combined training data, as a comparison baseline where pooling is allowed.
- **Federated:** clients keep separate datasets and exchange updates through FedAvg.

First, I would give clients similar class mixtures. Then I would deliberately skew those mixtures. For example, one client might mostly see one group of labels while another sees a different group. That makes “different data” a controlled experimental choice.

I would hold the model architecture, training examples, total example presentations, and evaluation split constant where applicable, and report any remaining compute differences. Every run would use held-out examples. I would record each client's accuracy alongside the overall score, repeat across seeds, and count communication bytes as well as rounds.

These are plans, not completed experiments. Before running anything, the next note should define the dataset split and training budget precisely enough that someone else can reproduce them.

## The question to carry forward

For now, I want to understand one thing: when clients see different data, which parts of their learning survive the averaging step?

The numerical example explains how parameters are combined. Whether that combination produces a useful model is the question the experiment has to answer.
